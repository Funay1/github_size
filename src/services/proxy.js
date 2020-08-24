const request = require('request');
const cheerio = require('cheerio');
const proxyUrl = 'https://sslproxies.org/';
// this code is used to get a free proxy ip and port.
async function getProxyList() {
  return new Promise((resolve) => {
    const ip_addresses = [];
    const port_numbers = [];
    request(proxyUrl, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('td:nth-child(1)').each(function (index) {
          ip_addresses[index] = $(this).text();
        });

        $('td:nth-child(2)').each(function (index) {
          port_numbers[index] = $(this).text();
        });
      } else {
        console.log('Error loading proxy, please try again');
      }

      ip_addresses.join(', ');
      port_numbers.join(', ');

      resolve(
        ip_addresses.map((e, i) => {
          return { host: e, port: port_numbers[i] };
        })
      );
    });
  });
}
module.exports = Object.freeze({
  getProxyList
});
