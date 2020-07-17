export const CONTEXT_MENU = {
	PAGE: {
		id: 'page',
		description: 'Browse folders and files',
		defaultTitle: 'Open folder in Explorer',
	},
	LINK: {
		id: 'link',
		description: 'Link',
		defaultTitle: 'Open the link destination in Explorer (for local files) ',
	},
	SELECTION: {
		id: 'selection',
		description: 'Text selection',
		defaultTitle: 'Open the selected string in Explorer (for local file path）',
	},
};

const generateStorageKey = key => `contextMenus.title.${key}`;

export const saveContextMenuTitle = (key, title) => {
	return new Promise((resolve, reject) => {
		if (!CONTEXT_MENU.hasOwnProperty(key)) {
			return reject('Unsupported ContextMenu type');
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
