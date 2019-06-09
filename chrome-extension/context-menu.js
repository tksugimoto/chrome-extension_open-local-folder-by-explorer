export const CONTEXT_MENU = {
	PAGE: {
		id: 'page',
		description: 'フォルダ・ファイル閲覧',
		defaultTitle: 'フォルダをExplorerで開く',
	},
	LINK: {
		id: 'link',
		description: 'リンク',
		defaultTitle: 'リンク先をExplorerで開く（ローカルファイルの場合）',
	},
	SELECTION: {
		id: 'selection',
		description: 'テキスト選択',
		defaultTitle: '選択文字列をExplorerで開く（ローカルファイルパスの場合）',
	},
};

const generateStorageKey = key => `contextMenus.title.${key}`;

export const saveContextMenuTitle = (key, title) => {
	return new Promise((resolve, reject) => {
		if (!CONTEXT_MENU.hasOwnProperty(key)) {
			return reject('サポートしていないContextMenu typeです');
		}
		const items = {
			[generateStorageKey(key)]: title,
		};
		chrome.storage.local.set(items, resolve);
	});
};

export const getContextMenuTitle = () => {
	const keys = Object.keys(CONTEXT_MENU).map(generateStorageKey);
	return new Promise(resolve => {
		chrome.storage.local.get(keys, items => {
			const contextMenuTitlePair = Object.entries(CONTEXT_MENU).map(([key, { defaultTitle }]) => {
				const storageKey = generateStorageKey(key);
				const title = items[storageKey] || defaultTitle;
				return [
					key,
					title,
				];
			});
			const contextMenuTitle = Object.fromEntries(contextMenuTitlePair);
			resolve(contextMenuTitle);
		});
	});
};

export const createContextMenu = () => {
	getContextMenuTitle().then(contextMenuTitle => {
		chrome.contextMenus.create({
			title: contextMenuTitle.PAGE,
			contexts: ['page'],
			documentUrlPatterns: [
				'file:///*',
			],
			id: CONTEXT_MENU.PAGE.id,
		});
		chrome.contextMenus.create({
			title: contextMenuTitle.LINK,
			contexts: ['link'],
			targetUrlPatterns: [
				// file:///* 指定だとローカルファイルリンクにメニューが表示されないため <all_urls> 指定している
				// ※ targetUrlPatterns 指定を無しにしてもOk
				'<all_urls>',
			],
			id: CONTEXT_MENU.LINK.id,
		});
		chrome.contextMenus.create({
			title: contextMenuTitle.SELECTION,
			contexts: ['selection'],
			id: CONTEXT_MENU.SELECTION.id,
		});
	});
};

export const updateContextMenu = () => {
	chrome.contextMenus.removeAll(createContextMenu);
};
