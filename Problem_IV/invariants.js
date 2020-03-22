const nbCoinsPerPlayer = 21;
const nbCoinsInGame = 42;
const maximumNbCoinsPerColumn = 6;
const maximumNbCoinsPerRow = 7;

module.exports = (state) => {
	// Verify first invariant
	// Number of coins of each player is 21 (CoinsPlayed + CoinsInHand)
	const { playerOne, playerTwo, nbCoinsPerColumn, nbCoinsPerRow } = state;
	const nbCoinsPlayerOne = playerOne.coinsPlayed + playerOne.coinsInHands;
	const nbCoinsPlayerTwo = playerTwo.coinsPlayed + playerTwo.coinsInHands;
	const nbCoinsPerPlayerIs21 = nbCoinsPlayerOne === nbCoinsPerPlayer && nbCoinsPlayerTwo === nbCoinsPerPlayer;

    // Verify Second invariant
    // Number of coins in played is less or equal than 42
    const nbCoinsInTableIsLessOrEqual42 = (playerOne.coinsPlayed + playerTwo.coinsPlayed) <= nbCoinsInGame;

    // Verify third invariant
    // Number of coins per column is less or equal than 6
    const nbCoinsPerColumnIsValid = nbCoinsPerColumn.every((nb) => nb <= maximumNbCoinsPerColumn) && nbCoinsPerColumn.length === 7;

    // Verify fourth invariant
    // Number of coins per row is less or equal than 7
    const nbCoinsPerRowIsValid = nbCoinsPerRow.every((nb) => nb <= maximumNbCoinsPerRow) && nbCoinsPerRow.length === 6;
    
	return nbCoinsPerPlayerIs21 && nbCoinsInTableIsLessOrEqual42 && nbCoinsPerColumnIsValid && nbCoinsPerRowIsValid;
};
