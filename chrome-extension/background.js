import common from './common.js';
import notificationUtil from './notification-util.js';

chrome.runtime.onInstalled.addListener(details => {
	if (details.reason === 'install') {
		chrome.runtime.openOptionsPage();
	}
});

const CONTEXT_MENU_ID = {
	PAGE: 'page',
	LINK: 'link',
	SELECTION: 'selection',
};

const createContextMenu = () => {
	chrome.contextMenus.create({
		title: 'フォルダをExplorerで開く',
		contexts: ['page'],
		documentUrlPatterns: [
			'file:///*',
		],
		id: CONTEXT_MENU_ID.PAGE,
	});
	chrome.contextMenus.create({
		title: 'リンク先をExplorerで開く（ローカルファイルの場合）',
		contexts: ['link'],
		targetUrlPatterns: [
			// file:///* 指定だとローカルファイルリンクにメニューが表示されないため <all_urls> 指定している
			// ※ targetUrlPatterns 指定を無しにしてもOk
			'<all_urls>',
		],
		id: CONTEXT_MENU_ID.LINK,
	});
	chrome.contextMenus.create({
		title: '選択文字列をExplorerで開く（ローカルファイルパスの場合）',
		contexts: ['selection'],
		id: CONTEXT_MENU_ID.SELECTION,
	});
};

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(createContextMenu);

chrome.contextMenus.onClicked.addListener((info) => {
	const extractResult = extractFilePath(info);
	if (!extractResult.isSucceeded) return;
	const messageToNative = {
		filePath: extractResult.path,
	};
	chrome.runtime.sendNativeMessage(common.applicationName, messageToNative, response => {
		console.info(response);

		notificationUtil.showNotification(response);
	});
});

class ExtractResult {
	constructor(target, path) {
		this.target = target;
		this.isSucceeded = !!path;
		this.path = path;
	}

	static ofFailure(target) {
		return new this(target, null);
	}
}

const extractFilePath = info => {
	if (info.menuItemId === CONTEXT_MENU_ID.PAGE) {
		const pageUrl = info.pageUrl;
		return new ExtractResult(pageUrl, convertUrl2FilePath(pageUrl));
	}
	if (info.menuItemId === CONTEXT_MENU_ID.LINK) {
		const linkUrl = info.linkUrl;
		if (!linkUrl.startsWith('file://')) {
			// link 要素用の右クリックメニューの表示対象を <all_urls> にしているため fileスキーマ以外を無視する
			return ExtractResult.ofFailure(linkUrl);
		}
		return new ExtractResult(linkUrl, convertUrl2FilePath(linkUrl));
	}
	if (info.menuItemId === CONTEXT_MENU_ID.SELECTION) {
		const selectionText = info.selectionText;
		if (selectionText.startsWith('"') && selectionText.endsWith('"')) {
			return new ExtractResult(selectionText, selectionText.slice(1, -1));
		}
		return new ExtractResult(selectionText, selectionText);
	}
};

const convertUrl2FilePath = encodedUrl => {
	const decodedURI = decodeURI(encodedUrl);
	if (decodedURI.startsWith('file:///')) {
		return decodedURI.replace(/^file:\/\/\//, '').replace(/\//g, '\\');
	}
	// UNC path ( "\\server_name\path\to\file" )
	// file://server_name/path/to/file
	return decodedURI.replace(/^file:/, '').replace(/\//g, '\\');
};
