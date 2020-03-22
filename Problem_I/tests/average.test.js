const average = require('../average');

const errorMsg = 'Error! The function must be call with two arguments';

test('should calculate average: a=2, b=4, average = 3', () => {
	const res = average(2, 4);
	expect(res).toBe(3);
});

test('should throw error if call with one argument', () => {
	expect(() => {
		average(2);
	}).toThrow(errorMsg);
	expect(() => average(undefined, 3)).toThrow(errorMsg);
});

test('should throw error if called with zero arguments', () => {
	expect(() => average()).toThrow(errorMsg);
});
