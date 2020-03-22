const overlap = require('../overlap');

const errorMsgOne = 'Error! The function must receives two intervals';
const errorMsgTwo = 'Error! The intervals objects must contain only integers';
const errorMsgThree = 'Error! The intervals must be well defined';

test('should overlap function must exists', () => {
	expect(overlap).not.toBeUndefined();
});

test('should throw an error if receives only one interval', () => {
	const A = undefined;
	const B = { b1: 1, b2: 3 };
	expect(() => overlap(A, B)).toThrowError(errorMsgOne);
	expect(() => overlap(A)).toThrowError(errorMsgOne);
	expect(() => overlap()).toThrowError(errorMsgOne);
});

test('should throw error if one interval is not defined with integers', () => {
	const A = { a1: 'Hola', a2: 2 };
	const B = { b1: 2, b2: 3 };
	expect(() => overlap(A, B)).toThrowError(errorMsgTwo);
});

/**
 * An interval is bad define when for A=(a1, a2) a1 > a2;
 */
test('should throw error if an interval is bad defined (See definition up)', () => {
	const A = { a1: 10, a2: 9 };
	const B = { b1: 1, b2: 2 };
	expect(() => overlap(A, B)).toThrowError(errorMsgThree);
});

/**
 * First case: is the following
 * 			  A
 * 	|-------------------|
 * 	a1					a2
 * 				|---------------------|
 * 				b1		  B			  b2
 * A only overlap a part of B so the result expected
 * of this test case is (b1, a2)
 * With:
 * 		- a1 < a2 and b1 < b2
 *		- a1 < b1
 *		- a2 > b1 and a2 < b2
 * Values for the test:
 * 		- (a1, a2) = (1, 4)
 * 		- (b1, b2) = (2, 6)
 * Expect value for the test: (2, 4)
 */
test('should return (b1, a2) when A overlap only a part of B', () => {
	const A = { a1: 1, a2: 4 };
	const B = { b1: 2, b2: 6 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: B.b1, r2: A.a2 });
});

/**
 * Alternative First Case: is the following
 * 			A
 * 	|----------------|
 * 	a1				 a2
 * 					 |-------------------|
 * 					 b1		   B         b2
 * A overlap B in one point. The expected value is (a2, b1) = (b1, b1) = (a2, a2)
 * With:
 * 		- a1 < a2 and b1 < b2
 * 		- a2 == b1
 * Values for the test:
 * 		- (a1, a2) = (1, 4)
 * 		- (b1, b2) = (4, 5)
 * Expected result: (4, 4)
 */
test('should return (b1, b1) when A=(a1, a2) overlap B=(b1, b2) in one point', () => {
	const A = { a1: 1, a2: 4 };
	const B = { b1: 4, b2: 5 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: B.b1, r2: B.b1 });
});

/**
 * Second case: is the following
 * 				   A
 * 			|--------------|
 * 		    a1			   a2
 * 		|-----------------------|
 * 		b1			B			b2
 * A is inside B so the expected result in this
 * case is (a1, a2).
 * With:
 * 		- a1 <= a2 and b1 < b2
 * 		- b1 < a1 and a2 < b2
 * Values for the test:
 * 		- (a1, a2) = (4, 6)
 * 		- (b1, b2) = (2, 8)
 * Expected result: (4, 6)
 * Alternative case one point inside A touch one point in the frontier of B
 * 		a1			A		   a2
 * 		|----------------------|
 * 	|--------------------------|
 * 	b1			 B			   b2
 * Instead of (a1, a2) = (4, 6) we test with (4, 8);
 */
test('should return A when A is inside B', () => {
	const A = { a1: 4, a2: 6 };
	const B = { b1: 2, b2: 8 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: A.a1, r2: A.a2 });
	const AlternativeA = { a1: 4, a2: 8 };
	const alternativeResult = overlap(AlternativeA, B);
	expect(alternativeResult).toEqual({ r1: AlternativeA.a1, r2: AlternativeA.a2 });
});

/**
 * Third case: is the following
 * 				   A
 * 	|------------------------------|
 *  a1							   a2
 * 		|--------------------|
 * 		b1		  B			 b2
 * B is inside A so the expected result is (b1, b2). This
 * case is the same as the one before.
 * With:
 * 		- a1 < a2 and b1 < b2
 * 		- a1 < b1 and b2 < a2
 * Values for the test:
 * 		- (a1, a2) = (2, 8)
 * 		- (b1, b2) = (4, 6)
 * Expected value: (4, 6)
 */
test('should return B when B is inside of A', () => {
	const A = { a1: 2, a2: 8 };
	const B = { b1: 4, b2: 6 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: B.b1, r2: B.b2 });
});

/**
 * Fourth case: is the following
 * 						   A
 * 				|---------------------|
 * 				a1					  a2
 *	|-------------------|
 *	b1		  B			b2
 * B overlap a piece of the interval of A this case
 * is the same as the first case. The expected result is (a1, b2)
 * With:
 * 		- a1 < a2 and b1 < b2
 * 		- b1 < a1 and b2 < a2
 * Values for the test:
 * 		- (a1, a2) = (2, 6)
 * 		- (b1, b2) = (1, 4)
 * Expected value: (2, 4)
 */
test('should return (a1, b2) when B=(b1, b2) overlap a piece of A=(a1, a2)', () => {
	const A = { a1: 2, a2: 6 };
	const B = { b1: 1, b2: 4 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: A.a1, r2: B.b2 });
});

/**
 * Alternative First Case: is the following
 * 			B
 * 	|----------------|
 * 	b1				 b2
 * 					 |-------------------|
 * 					 a1		   A         a2
 * A overlap B in one point. The expected value is (b2, a1) = (b2, b2) = (a1, a1)
 * With:
 * 		- a1 < a2 and b1 < b2
 * 		- b2 == a1
 * Values for the test:
 * 		- (a1, a2) = (1, 4)
 * 		- (b1, b2) = (4, 5)
 * Expected result: (4, 4)
 */
test('should return (b2, a1) when B=(b1, b2) overlap one point of A=(a1, a2)', () => {
	const B = { b1: 1, b2: 4 };
	const A = { a1: 4, a2: 5 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: A.a1, r2: B.b2 });
});

/**
 * Fifth case: is the following
 * 					A
 * 			|---------------|
 * 			a1				a2
 * 			|---------------|
 * 			b1		B		b2
 * A overlap B and B overlap A so the expected result is A or B.
 * With:
 * 		- a1 == b1 and a2 == b2
 * Values for the test:
 * 		- (a1, a2) = (1, 3)
 * 		- (b1, b2) = (1, 3)
 * Expected result: (1, 3)
 */
test('should return either A or B when A = B', () => {
	const A = { a1: 1, a2: 3 };
	const B = { b1: 1, b2: 3 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: A.a1, r2: A.a2 });
});

/**
 * Sixth case: is the following
 * 		   A
 * 	|--------------|
 * 	a1			   a2
 * 						|------------------|
 * 						b1		  B		   b2
 * A does not overlap B or B does not overlap A. The expected result is: (null, null)
 * With:
 * 		- a1 <= a2 and b1 <= b2
 * 		- a2 < b1
 * Values for the test:
 * 		- (a1, a2) = (1, 4)
 * 		- (b1, b2) = (5, 8)
 * Expected result: (null, null)
 */
test('should return (null, null) because A does not overlap B', () => {
	const A = { a1: 1, a2: 4 };
	const B = { b1: 5, b2: 8 };
	const result = overlap(A, B);
	expect(result).toEqual({ r1: null, r2: null });
});
