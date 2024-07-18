const path = require('path');
const dotenv = require('dotenv').config();


module.exports = {
    dbUrl : process.env.MONGODB_URL,
    cert: path.join(__dirname, ''),
    key: path.join(__dirname,''),
    portHttp:80,
    portHttps:443
}