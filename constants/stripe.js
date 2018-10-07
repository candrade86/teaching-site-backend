const configureStripe = require('stripe');
require('dotenv').config();
const STRIPE_SECRET_KEY = process.env.SK_TEST_MY_SECRET_KEY;
const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;