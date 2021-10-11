const dotenv = require('dotenv');
const Client = require('./structures/Client');

//Load config from .env
dotenv.config();

new Client().start(process.env.CLIENT_TOKEN);
