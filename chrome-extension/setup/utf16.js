/**
 * Convert a string to a Uint16Array for UTF-16
 * @param {String} str
 * @returns {Uint16Array}
 */
export const convertToUtf16 = str => {
	// Use UTF-16 code units (not code points) to keep surrogate pairs
	return Uint16Array.from({ length: str.length }, (_, i) => str.charCodeAt(i));
};
