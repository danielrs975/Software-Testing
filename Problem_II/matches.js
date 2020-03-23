const bestMoveIsOne = [ 2, 6, 10, 14, 18, 22, 26, 30 ]; // These are the numbers which the best play is to remove one match
const bestMoveIsTwo = [ 3, 7, 11, 15, 19, 23, 27 ]; // These are the numbers which the best play is to remove two matches
const bestMoveIsThree = [ 4, 8, 12, 16, 20, 24, 28 ]; // These are the numbers which the best play is to remove three matches
/**
 * This function return tha number of matches removes by the player
 * @param {Int} nbMatches number of matches left in the game 
 */
const player = (nbMatches) => {
	if (nbMatches <= 0) throw new Error('Error! The number of matches left must be positive');
	if (nbMatches > 30) throw new Error('Error! The number of matches must be less or equal than 30');
	// We check if the nbMatches enter a specific group and return the best move
	if (bestMoveIsOne.indexOf(nbMatches) != -1) {
		return 1;
	} else if (bestMoveIsTwo.indexOf(nbMatches) != -1) {
		return 2;
	} else if (bestMoveIsThree.indexOf(nbMatches) != -1) {
		return 3;
	} else {
		// In here we can return either 1, 2 or 3, it does not matter
		// because there is no move to win the game
		return 1;
	}
};

module.exports = {
	player
};
