import common from './common.js';

chrome.runtime.onInstalled.addListener(details => {
	if (details.reason === 'install') {
		chrome.runtime.openOptionsPage();
	}
});

const CONTEXT_MENU_ID = {
	PAGE: 'page',
	LINK: 'link',
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
};

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(createContextMenu);

chrome.contextMenus.onClicked.addListener((info) => {
	const filePath = extractFilePath(info);
	if (!filePath) return;
	const messageToNative = {
		filePath,
	};
	chrome.runtime.sendNativeMessage(common.applicationName, messageToNative, response => {
		console.info(response);
	});
});

const extractFilePath = info => {
	if (info.menuItemId === CONTEXT_MENU_ID.PAGE) {
		return convertUrl2FilePath(info.pageUrl);
	}
	if (info.menuItemId === CONTEXT_MENU_ID.LINK) {
		const linkUrl = info.linkUrl;
		if (!linkUrl.startsWith('file://')) {
			// link 要素用の右クリックメニューの表示対象を <all_urls> にしているため fileスキーマ以外を無視する
			return;
		}
		return convertUrl2FilePath(linkUrl);
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
