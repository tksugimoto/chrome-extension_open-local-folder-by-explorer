

const extensionName = chrome.runtime.getManifest().name;

const showNotification = info => {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: '/icons/icon128.png',
		title: info.resultMessage,
		message: info.path,
		contextMessage: extensionName,
	});
};

export default {
	showNotification,
};
