const axios = require('axios');

const apiBase = 'https://api.coinmarketcap.com/v1/';

const api = (endpoint) => axios.get(apiBase + endpoint);

exports.getCurrency = (name) => api(`ticker/${name}`);