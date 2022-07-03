require('dotenv').config()
const {PORT_CONNECT, MONGO_URL, SECRET_KEY, PASS_EMAIL, EMAIL}=process.env;

module.exports = {PORT_CONNECT, MONGO_URL, SECRET_KEY, PASS_EMAIL, EMAIL}