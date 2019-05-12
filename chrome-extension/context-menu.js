export const CONTEXT_MENU_ID = {
	PAGE: 'page',
	LINK: 'link',
	SELECTION: 'selection',
};

export const createContextMenu = () => {
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
