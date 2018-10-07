
module.exports = process.env.NODE_ENV === 'production'
  ? process.env.FRONTEND_PROD_URLS
  : process.env.FRONTEND_DEV_URLS;