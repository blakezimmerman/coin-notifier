# Coin Notifier

This is a simple Node.js server that will send you an SMS message when specified cryptocurrencies on CoinMarketCap dip below or exceed a specified threshold.

## How to Use

To run this server, you need to provide it with a `config.json` file that has the following structure:

```
{
  "notifications": [
    {
      "currency": "Currency you want to watch e.g. bitcoin, ethereum",
      "thresholds": [
        {
          "thresholdType": "Data to monitor (price_usd, percent_change_1h, percent_change_24h, or percent_change_7d)",
          "compareBy": "How to compare current value to threshold (lt or gt)"
          "threshold": "Value you want to be notified at",
        }
      ],
      "apiInterval": "Time interval in milliseconds to check CoinMarketCap"
      "smsRate": "Max rate in milliseconds to send SMS notifications"
      "recipients": [
        {
          "number": "Phone number to notify",
          "provider": "Cellular carrier for above number"
        }
      ]
    }
  ],
  "email": {
    "service": "Your email service e.g. gmail, aol, yahoo",
    "user": "Your email address",
    "password": "Your email password"
  }
}
```

For example, to check the price of Ethereum every 15 minutes and send notifications at a max rate of once an hour when it drops below $1000 or exceeds $1300, the `config.json` might look like this:

```
{
  "notifications": [
    {
      "currency": "ethereum",
      "thresholds": [
        {
          "thresholdType": "price_usd",
          "compareBy": "lt",
          "threshold": "1000",
        },
        {
          "thresholdType": "price_usd",
          "compareBy": "gt",
          "threshold": "1300",
        }
      ],
      "apiInterval": 900000,
      "smsRate": 3600000,
      "recipients": [
        {
          "number": "1234567890",
          "provider": "AT&T"
        }
      ]
    }
  ],
  "email": {
    "service": "gmail",
    "user": "myemail@gmail.com",
    "password": "secretpassword"
  }
}
```

Next, you must install the dependencies using `npm install`.

Finally, you can start the server using `npm start`.

## Notes

For a list of available cellular carriers, look at `providers.json`. This file can be extended to support more carriers.

For a list of available email services, look at the [Nodemailer docs](https://nodemailer.com/smtp/well-known/ "Nodemailer Well-Known Services").