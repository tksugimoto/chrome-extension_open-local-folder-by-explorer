export const CONTEXT_MENU = {
	PAGE: {
		id: 'page',
		title: 'フォルダをExplorerで開く',
	},
	LINK: {
		id: 'link',
		title: 'リンク先をExplorerで開く（ローカルファイルの場合）',
	},
	SELECTION: {
		id: 'selection',
		title: '選択文字列をExplorerで開く（ローカルファイルパスの場合）',
	},
};

export const createContextMenu = () => {
	chrome.contextMenus.create({
		title: CONTEXT_MENU.PAGE.title,
		contexts: ['page'],
		documentUrlPatterns: [
			'file:///*',
		],
		id: CONTEXT_MENU.PAGE.id,
	});
	chrome.contextMenus.create({
		title: CONTEXT_MENU.LINK.title,
		contexts: ['link'],
		targetUrlPatterns: [
			// file:///* 指定だとローカルファイルリンクにメニューが表示されないため <all_urls> 指定している
			// ※ targetUrlPatterns 指定を無しにしてもOk
			'<all_urls>',
		],
		id: CONTEXT_MENU.LINK.id,
	});
	chrome.contextMenus.create({
		title: CONTEXT_MENU.SELECTION.title,
		contexts: ['selection'],
		id: CONTEXT_MENU.SELECTION.id,
	});
};
