const invariant = require('../invariants');

const goodState = {
	playerOne        : {
		coinsPlayed  : 1,
		coinsInHands : 20
	},
	playerTwo        : {
		coinsPlayed  : 2,
		coinsInHands : 19
	},
	nbCoinsPerColumn : [ 1, 3, 4, 2, 1, 4, 2 ],
	nbCoinsPerRow    : [ 1, 2, 3, 4, 2, 5 ]
};

/**
 * First Invariant: Coins Played by each player + Coins in his hands = 21
 */
test('should return true if coins played + coins in hands = 21', () => {
	const state = goodState;
	const isValid = invariant(state);
	expect(isValid).toBeTruthy();
});

test('should return false if coins played + coins in hands != 21', () => {
	const state = {
		playerOne        : {
			coinsPlayed  : 21,
			coinsInHands : 12
		},
		playerTwo        : {
			coinsPlayed  : 1,
			coinsInHands : 20
		},
		nbCoinsPerColumn : [ 1, 3, 4, 2, 1, 4, 2 ],
		nbCoinsPerRow    : [ 1, 2, 3, 4, 2, 5 ]
	};
	const isValid = invariant(state);
	expect(isValid).toBeFalsy();
});

/**
 * Second Invariant: The sum of the coins played by each player must be less or equal than 42
 */
test('should return true if coins played one + coins played two <= 42', () => {
	const state = goodState;
	const isValid = invariant(state);
	expect(isValid).toBeTruthy();
});

/**
 * Third invariant: The number of coins per column is maximum 6 coins always
 */
test('should return true if coins per column is less or equal than six', () => {
	const state = goodState;
	const isValid = invariant(state);
	expect(isValid).toBeTruthy();
});

test('should return false if exists a column with more than six coins', () => {
	const state = {
		playerOne        : {
			coinsPlayed  : 1,
			coinsInHands : 20
		},
		playerTwo        : {
			coinsPlayed  : 2,
			coinsInHands : 19
		},
		nbCoinsPerColumn : [ 1, 3, 4, 2, 1, 7, 2 ],
		nbCoinsPerRow    : [ 1, 2, 3, 4, 2, 5 ]
	};
	const isValid = invariant(state);
	expect(isValid).toBeFalsy();
});

/**
 * Fourth invariant: The number of coins for each row is 7 maximum
 */
test('should return true if every row has less or equal 7 coins', () => {
	const state = goodState;
	const isValid = invariant(state);
	expect(isValid).toBeTruthy();
});

test('should return false if exists a row with more than seven coins', () => {
	const state = {
		playerOne        : {
			coinsPlayed  : 1,
			coinsInHands : 20
		},
		playerTwo        : {
			coinsPlayed  : 2,
			coinsInHands : 19
		},
		nbCoinsPerColumn : [ 1, 3, 4, 2, 1, 4, 2 ],
		nbCoinsPerRow    : [ 1, 2, 3, 4, 2, 8 ]
	};
	const isValid = invariant(state);
	expect(isValid).toBeFalsy();
});
