const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let newArray = [];
  const commands = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];

  for (let i = 0; i < arr.length; i++) {
    if (commands.includes(arr[i])) {
      switch (arr[i]) {
        case '--discard-next':
          if (i + 1 < arr.length) i++;
          break;
        case '--discard-prev':
          if (newArray.length > 0 && newArray[newArray.length - 1] === arr[i - 1]) newArray.pop();
          break;
        case '--double-next':
          if (i + 1 < arr.length) newArray.push(arr[i + 1]);
          break;
        case '--double-prev':
          if (newArray.length > 0 && i - 1 > 0 && newArray[newArray.length - 1] === arr[i - 1]) newArray.push(newArray[newArray.length - 1]);
          break;
        default:
          break;
      }
    } else {
      newArray.push(arr[i]);
    }
  }

  return newArray;
}

module.exports = {
  transform
};