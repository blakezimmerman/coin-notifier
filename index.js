const { Client } = require('coinbase');
const sendText = require('./sendText');
const { apiKey, apiSecret, notifications } = require('./config.json');

const coinbase = new Client({ apiKey, apiSecret, version: '2017-08-07' });

function checkPrice(currency, threshold, recipients) {
  coinbase.getBuyPrice({currencyPair: `${currency}-USD`}, (err, res) => {
    const price = res.data.amount;
    if (parseFloat(price) < parseFloat(threshold)) {
      recipients.forEach(recipient => { notify(currency, price, recipient); });
    }
  });
}

function notify(currency, price, recipient) {
  console.log(`Sending message to ${recipient.number} regarding ${currency}`);
  const message = `${currency} is currently selling at $${price} on Coinbase. Time to invest!`;
  sendText(recipient, message, (err) => { console.log(err); });
}

notifications.forEach(({currency, threshold, recipients}) => {
  setInterval(checkPrice, 10000, currency, threshold, recipients);
});
