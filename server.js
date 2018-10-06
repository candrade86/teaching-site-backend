const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

mongoose
  .connect(config.db_url)
  .then(() => console.log('\n <>--<>--<> connected to MongoDB <>--<>--<>\n'))
  .catch(err => console.log('Failed to connect to mongoDB'))

const authController = require('./auth/authController');
const eventController = require('./events/eventController');


const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/authentication', authController);
server.use('/api/event', eventController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));