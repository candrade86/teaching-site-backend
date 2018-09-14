module.exports = {
    secret: 'the earth is flat!',
    // secret: process.env.SECRET_KEY ,
    db_url: 'mongodb://admin:admin1@ds257732.mlab.com:57732/teaching-site',
    // db_url: process.env.DB_URL,
    port: process.env.PORT, // process.env.PORT
}