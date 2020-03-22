const { player } = require('../matches');

/**
 * This function simulate the complete game of matches
 * @param {*} initialNbOfMatches The number of matches to initiate the game
 */
const simulateGame = (initialNbOfMatches) => {
	let matchesLeft = initialNbOfMatches;
	let playerOneMatchesRemoved;
	let playerTwoMatchesRemoved;
	let matchesBefore;
	let turn = 'One';
	while (matchesLeft > 1 && matchesBefore != matchesLeft) {
		playerOneMatchesRemoved = undefined;
		playerTwoMatchesRemoved = undefined;
		matchesBefore = matchesLeft;
		if (turn === 'One') {
			playerOneMatchesRemoved = player(matchesLeft);
			matchesLeft -= playerOneMatchesRemoved;
			turn = 'Two';
		} else if (turn === 'Two') {
			playerTwoMatchesRemoved = player(matchesLeft);
			matchesLeft -= playerTwoMatchesRemoved;
			turn = 'One';
		}
	}
	return {
		matchesLeft,
		playerTwoMatchesRemoved,
		playerOneMatchesRemoved
	};
};

test('should the function of the player must exists', () => {
	expect(player).not.toEqual({});
});

test('should throw an error if receives a not positive integer', () => {
	expect(() => player(0)).toThrow('Error! The number of matches left must be positive');
});

test('should throw an error if receives a number of matches greater than 30', () => {
	expect(() => player(31)).toThrow('Error! The number of matches must be less or equal than 30');
});

test('should player two win if the number of matches left is 1', () => {
	const initialNumberOfMatches = 1;
	const { matchesLeft, playerOneMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerOneMatchesRemoved).toBeUndefined();
	expect(matchesLeft).toBe(1);
});

test('should player one win if the number of matches left is 2', () => {
	const initialNumberOfMatches = 2;
	const { matchesLeft, playerTwoMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerTwoMatchesRemoved).toBeUndefined(); // The player cannot play because the game has ended
	expect(matchesLeft).toBe(1);
});

test('should player one win if the number of matches left is 3', () => {
	const initialNumberOfMatches = 3;
	const { matchesLeft, playerTwoMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerTwoMatchesRemoved).toBeUndefined(); // The player cannot play because the game has ended
	expect(matchesLeft).toBe(1);
});

test('should player one win if the number of matches left is 4', () => {
	const initialNumberOfMatches = 4;
	const { matchesLeft, playerTwoMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerTwoMatchesRemoved).toBeUndefined(); // The player cannot play because the game has ended
	expect(matchesLeft).toBe(1);
});

test('should player two win if the number of matches left is 5', () => {
	const initialNumberOfMatches = 5;
	const { matchesLeft, playerTwoMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerTwoMatchesRemoved).not.toBeUndefined();
	expect(matchesLeft).toBe(1);
});

test('should player one win if the number of matches left is 6', () => {
	const initialNumberOfMatches = 6;
	const { matchesLeft, playerTwoMatchesRemoved, playerOneMatchesRemoved } = simulateGame(initialNumberOfMatches);
	expect(playerTwoMatchesRemoved).toBeUndefined();
	expect(playerOneMatchesRemoved).not.toBeUndefined();
	expect(matchesLeft).toBe(1);
});

// At this point we saw a pattern for each 4 matches it is not possible to win
// that means for the group  [1, 5, 9, 13, 17, 21, 25, 29] the player one cannot win
test('should player two win if the number of matches is inside this group [1, 5, 9, 13, 17, 21, 25, 29]', () => {
	// We do not include the 1 and 5 because we already tested them
	[ 9, 13, 17, 21, 25, 29 ].forEach((nb) => {
		const initialNbOfMatches = nb;
		const { matchesLeft, playerOneMatchesRemoved } = simulateGame(initialNbOfMatches);
		expect(playerOneMatchesRemoved).toBeUndefined(); // Player One lose
		expect(matchesLeft).toBe(1);
	});
});

test('should player one win if the number of matches is not inside this group [1, 5, 9, 13, 17, 21, 25, 29]', () => {
	[ 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30 ].forEach((nb) => {
		const initialNbOfMatches = nb;
		const { matchesLeft, playerTwoMatchesRemoved } = simulateGame(initialNbOfMatches);
		expect(playerTwoMatchesRemoved).toBeUndefined();
		expect(matchesLeft).toBe(1);
	});
});
