const { Client } = require('coinbase');
const sendText = require('./sendText');
const { apiKey, apiSecret, notifications } = require('./config.json');

const coinbase = new Client({ apiKey, apiSecret, version: '2017-08-07' });

function checkPrice(currency, compareBy, threshold, recipients) {
  coinbase.getBuyPrice({currencyPair: `${currency}-USD`}, (err, res) => {
    const price = res.data.amount;
    let first, second;
    if (compareBy === 'lt') {
      first = parseFloat(price), second = parseFloat(threshold);
    } else {
      first = parseFloat(threshold), second = parseFloat(price);
    }
    if (first <= second) {
      recipients.forEach(recipient => { notify(currency, price, recipient); });
    }
  });
}

function notify(currency, price, recipient) {
  console.log(`Sending message to ${recipient.number} regarding ${currency}`);
  const message = `${currency} is currently selling at $${price} on Coinbase.`;
  sendText(recipient, message, (err) => { console.log(err); });
}

notifications.forEach(({currency, compareBy, threshold, interval, recipients}) => {
  setInterval(checkPrice, interval, currency, compareBy, threshold, recipients);
});
