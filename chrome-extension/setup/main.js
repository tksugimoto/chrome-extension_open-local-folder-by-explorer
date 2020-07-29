import common from '../common.js';
import {
	CONTEXT_MENU,
	saveContextMenuTitle,
	getContextMenuTitle,
	updateContextMenu,
} from '../context-menu.js';
import notificationUtil from '../notification-util.js';

{
	const downloadLink = document.getElementById('manifest-json-download-link');
	const manifestJsonContent = common.generateManifestJson();
	const blob = new Blob([manifestJsonContent], {
		type: 'text/plain',
	});
	downloadLink.href = URL.createObjectURL(blob);
}

{
	/**
	 * Convert a string to a Uint16Array for UTF-16
	 * @param {String} str
	 * @returns {Uint16Array}
	 */
	const convertToUtf16 = str => {
		const codePointArray = Array.from(str).map(c => c.codePointAt(0));
		// TODO: Surrogate Pairs (when the code point exceeds 0xFFFF)
		return new Uint16Array(codePointArray);
	};

	const dirPath = document.getElementById('dirPath');
	const downloadLink = document.getElementById('reg-download-link');
	downloadLink.download = 'manifest.reg';
	const update = () => {
		const bom = '\uFEFF';
		const registryInfo = common.generateRegistryInfo(dirPath.value || dirPath.placeholder);
		const regFileContent = registryInfo.regFileContent;

		const blob = new Blob([convertToUtf16(bom + regFileContent).buffer], {
			type: 'text/plain',
		});
		downloadLink.href = URL.createObjectURL(blob);

		document.getElementById('reg-content').innerText = regFileContent;
		document.getElementById('reg-key').innerText = registryInfo.key;
		document.getElementById('reg-value').innerText = registryInfo.value;
	};

	dirPath.addEventListener('change', update);
	dirPath.addEventListener('keyup', update);
	dirPath.addEventListener('paste', () => {
		setTimeout(update, 10);
	});
	update();
}

{
	const filePathToOpen = document.getElementById('filePathToOpen');
	const openButton = document.getElementById('open');
	const execOpen = () => {
		let filePath = String(filePathToOpen.value);
		if (filePath.startsWith('"') && filePath.endsWith('"')) {
			filePath = filePath.slice(1, -1);
		}
		const message = {
			filePath,
		};
		chrome.runtime.sendNativeMessage(common.applicationName, message, response => {
			console.info(response);

			notificationUtil.showNotification(response);
		});
	};
	openButton.addEventListener('click', execOpen);
	filePathToOpen.addEventListener('keydown', evt => {
		if (evt.key === 'Enter') {
			execOpen();
		}
	});
}

{
	const container = document.getElementById('context-menu-title-setting-container');

	getContextMenuTitle().then(contextMenuTitle => {
		Object.entries(contextMenuTitle).map(([key, currentTitle]) => {
			const input = document.createElement('input');
			input.value = currentTitle;
			input.placeholder = CONTEXT_MENU[key].defaultTitle;
			input.title = 'Press Enter to save';
			input.addEventListener('keydown', evt => {
				if (evt.key === 'Enter') {
					saveContextMenuTitle(key, input.value).then(updateContextMenu);
				}
			});

			const li = document.createElement('li');
			li.append(CONTEXT_MENU[key].description);
			li.append(input);
			container.append(li);
		});
	});
}
