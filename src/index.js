const api = require('./cmcApi');
const sendText = require('./sendText');
const { throttle, passedThreshold } = require('./utils');
const { notifications } = require('../config.json');

function checkData(currency, thresholds, recipients, notify) {
  api.getCurrency(currency).then(({data}) => {
    thresholds.forEach(({thresholdType, compareBy, threshold}) =>
      passedThreshold(data[0][thresholdType], threshold, compareBy) &&
      notify(currency, data[0], recipients)
    );
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

notifications.forEach(({currency, thresholds, apiInterval, smsRate, recipients}) => {
  const notify = throttle(sendNotifications, smsRate);
  setInterval(checkData, apiInterval, currency, thresholds, recipients, notify);
});
