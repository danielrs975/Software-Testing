/**
 * This function returns the interval where A and B overlap
 * @param {} intervalA the first interval
 * @param {} intervalB the second interval
 */
module.exports = (intervalA, intervalB) => {
    if (!intervalA || !intervalB ) throw new Error('Error! The function must receives two intervals');
    // Extract the points of the intervals
    const {a1, a2} = intervalA;
    const {b1, b2} = intervalB;

    // Variable that save a boolean if the intervals have valids points
    // A valid point is defined to be a Number
    const areValidIntervals = typeof a1 === 'number' && typeof a2 === 'number' && typeof b1 === 'number' && typeof b2 === 'number'
    if (!areValidIntervals) throw new Error('Error! The intervals objects must contain only integers');
    const areWellDefined = a1 <= a2 && b1 <= b2;
    if (!areWellDefined) throw new Error('Error! The intervals must be well defined');

    let r1 = null, r2 = null;
    let pointA = Math.max(a1, b1);
    let pointB = Math.min(a2, b2);
    if (pointA <= pointB) {
        r1 = pointA;
        r2 = pointB;
    }
    //              | |
    //              | | Equivalent solutions (Refactorization)
    //              | |
    // if (a1 < b1 && a2 > b1 && a2 < b2) {
    //     r1 = pointA;
    //     r2 = pointB;
    // } else if (a2 == b1) {
    //     r1 = b1;
    //     r2 = b1;
    // } else if (b1 <= a1 && a2 <= b2) {
    //     r1 = pointA;
    //     r2 = pointB;
    // } else if (a1 < b1 && b2 < a2) {
    //     r1 = pointA;
    //     r2 = pointB;
    // } else if (b1 < a1 && b2 < a2) {
    //     r1 = pointA;
    //     r2 = pointB;
    // } else if (b2 == a1) {
    //     r1 = b2;
    //     r2 = b2;
    // } 
    
    return {
        r1,
        r2
    }
};
