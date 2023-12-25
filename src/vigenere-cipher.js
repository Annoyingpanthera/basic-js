const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
const alphabetStart = 65;
const alphabetLength = 26;
const charA = 65;
const charZ = 91;

class VigenereCipheringMachine {

  constructor(isReverse) {
    this.isReverse = isReverse === false ? isReverse : true;
    this.keyArray = [];
    this.messageArray = [];
    this.resultArray = [];
  }

  encrypt(message, key) {
    this.prepareArrays(message, key);
    this.resultArray = this.messageArray.map((char, index) => char = ((char === ' ' || char < charA) || char > charZ) ? char : (char - alphabetStart + (this.keyArray[index] - alphabetStart)) % alphabetLength + alphabetStart);
    this.reverseIfNeeded();
    return String.fromCharCode(...this.resultArray);
  }

  decrypt(message, key) {
    this.prepareArrays(message, key);
    this.resultArray = this.messageArray.map((char, index) => char = ((char === ' ' || char < charA) || char > charZ) ? char : (((char - alphabetStart - this.keyArray[index] - alphabetStart) % alphabetLength) + alphabetLength) % alphabetLength + alphabetStart);
    this.reverseIfNeeded();
    return String.fromCharCode(...this.resultArray);
  }

  reverseIfNeeded() {
    if (!this.isReverse) {
      this.resultArray = this.resultArray.reverse();
    }
  }

  prepareArrays(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    this.keyArray = Array.from(key.toUpperCase());
    this.messageArray = Array.from(message.toUpperCase());

    while (this.keyArray.length < this.messageArray.length) {
      this.keyArray.push(...this.keyArray);
    }

    for (let i = 0; i < this.messageArray.length; i++) {
      if (this.messageArray[i] === " ") {
        this.keyArray.splice(i, 0, ' ');
      }
    }

    this.keyArray = this.keyArray.map((char) => char = char.charCodeAt(0));
    this.messageArray = this.messageArray.map((char) => char = char.charCodeAt(0));
  }
}

module.exports = {
  VigenereCipheringMachine
};
