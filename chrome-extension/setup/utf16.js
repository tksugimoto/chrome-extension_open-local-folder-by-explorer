/**
 * Convert a string to a Uint16Array for UTF-16
 * @param {String} str
 * @returns {Uint16Array}
 */
export const convertToUtf16 = str => {
	const codePointArray = Array.from(str).map(c => c.codePointAt(0));
	// TODO: Supports surrogate pairs (if codePoint is greater than 0xFFFF)
	return new Uint16Array(codePointArray);
};
