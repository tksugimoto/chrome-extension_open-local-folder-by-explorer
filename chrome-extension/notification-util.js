

const extensionName = chrome.runtime.getManifest().name;

const showNotification = info => {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: '/icons/icon128.png',
		title: extensionName,
		message: info.message,
	});
};

export default {
	showNotification,
};
