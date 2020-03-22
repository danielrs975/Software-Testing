/**
 * This functions takes two integer numbers and
 * return the average
 * @param a integer
 * @param b integer
 * @returns float | string
 */
module.exports = (a, b) => {
	if (!b | !a) throw new Error('Error! The function must be call with two arguments');
	return (a + b) / 2;
};
