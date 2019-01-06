import common from '../common.js';

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
	 * 文字列をUTF-16用にUint16Arrayに変換する
	 * @param {String} str
	 * @returns {Uint16Array}
	 */
	const convertToUtf16 = str => {
		const codePointArray = Array.from(str).map(c => c.codePointAt(0));
		// TODO: サロゲートペア（codePointが0xFFFFを超える場合）対応
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
		});
	};
	openButton.addEventListener('click', execOpen);
	filePathToOpen.addEventListener('keydown', evt => {
		if (evt.key === 'Enter') {
			execOpen();
		}
	});
}
