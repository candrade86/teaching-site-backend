const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const paymentApi = require('./stripe/controller');
require('dotenv').config();

mongoose
  .connect(config.db_url)
  .then(() => console.log('\n <>--<>--<> connected to MongoDB <>--<>--<>\n'))
  .catch(err => console.log('Failed to connect to mongoDB'))

const authController = require('./auth/authController');
const eventController = require('./events/eventController');


const server = express();

server.use(helmet());
server.use(morgan('dev'));
// server.use(cors());
server.use(express.json());

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

server.use(cors(corsOptions));
paymentApi(server);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/authentication', authController);
server.use('/api/event', eventController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));