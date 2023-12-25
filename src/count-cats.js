const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(matrix) {
  if (!matrix || !Array.isArray(matrix)) {
    throw new TypeError('Invalid input. Expected a matrix (2D array).');
  }

  let catCount = 0;

  for (const row of matrix) {
    if (Array.isArray(row)) {
      for (const item of row) {
        if (item === '^^') {
          catCount++;
        }
      }
    }
  }

  return catCount;
}

module.exports = {
  countCats
};