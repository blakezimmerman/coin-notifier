const api = require('./cmcApi');
const sendText = require('./sendText');
const { throttle, passedThreshold } = require('./utils');
const { notifications } = require('../config.json');

function checkData(currency, thresholdType, compareBy, threshold, recipients, notify) {
  api.getCurrency(currency).then(({data}) => {
    passedThreshold(data[0][thresholdType], threshold, compareBy) &&
    notify(currency, data[0], recipients);
  }).catch((err) => console.log(err));
}

function sendNotifications(currency, data, recipients) {
  recipients.forEach((recipient) => {
    console.log(`Sending message to ${recipient.number} regarding ${currency}`);
    const message =
      ` ${currency} update | Price (USD): ${data.price_usd} |` +
      ` Change (1h): ${data.percent_change_1h}% |` +
      ` Change (24h): ${data.percent_change_24h}% |` +
      ` Change (7d): ${data.percent_change_7d}%`;
    sendText(recipient, message, (err) => { console.log(err); });
  });
}

notifications.forEach(({currency, thresholdType, compareBy, threshold, apiInterval, smsRate, recipients}) => {
  const notify = throttle(sendNotifications, smsRate);
  setInterval(checkData, apiInterval, currency, thresholdType, compareBy, threshold, recipients, notify);
});
