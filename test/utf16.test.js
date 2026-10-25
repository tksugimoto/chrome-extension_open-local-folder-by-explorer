import assert from 'node:assert/strict';
import { it } from 'node:test';

import { convertToUtf16 } from '../chrome-extension/setup/utf16.js';

const decodeUtf16le = uint16Array => new TextDecoder('utf-16le').decode(uint16Array);

it('converts characters in the BMP', () => {
	const str = 'C:\\ユーザー\\host-app';
	assert.equal(decodeUtf16le(convertToUtf16(str)), str);
});

it.expectFailure('converts surrogate pairs', () => {
	const str = 'C:\\𠮷\\host-app';
	assert.equal(decodeUtf16le(convertToUtf16(str)), str);
});
