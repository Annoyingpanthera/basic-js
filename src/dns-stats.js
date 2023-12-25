const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  if (!Array.isArray(domains)) {
    throw new TypeError('Invalid input. Expected an array of domains.');
  }

  const dnsStats = {};

  domains.forEach((domain) => {
    const parts = domain.split('.').reverse();
    let currentDomain = '';

    parts.forEach((part) => {
      currentDomain += `.${part}`;
      dnsStats[currentDomain] = (dnsStats[currentDomain] || 0) + 1;
    });
  });

  return dnsStats;
}

module.exports = {
  getDNSStats
};
