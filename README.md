# Coin Notifier

This is a simple Node.js server that will send you an SMS message when specified cryptocurrencies on Coinbase dip below or exceed a specified threshold.

## How to Use

To run this server, you need to provide it with a `config.json` file that has the following structure:

```
{
  "apiKey": "Your Coinbase API Key",
  "apiSecret": "Your Coinbase API Secret",
  "notifications": [
    {
      "currency": "Currency you want to watch e.g. ETH",
      "compareBy": "How to compare current price to threshold (lt or gt)"
      "threshold": "Price in USD you want to be notified at",
      "interval": "Time interval in milliseconds to check Coinbase"
      "recipients": [
        {
          "number": "Phone number to notify",
          "provider": "Cellular carrier for above number"
        }
      ]
    }
  ],
  "email": {
    "service": "Your email service e.g. gmail",
    "user": "Your email address",
    "password": "Your email password"
  }
}
```

Then you must install the dependencies using `npm install`.

Finally, you can start the server using `npm start`.

## Notes

For a list of available cellular carriers, look at `providers.json`. This file can be extended to support more carriers.

For a list of available email services, look at the [Nodemailer docs](https://nodemailer.com/smtp/well-known/ "Nodemailer Well-Known Services").