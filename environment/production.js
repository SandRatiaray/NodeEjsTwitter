const path = require('path');
const dotenv = require('dotenv').config();


module.exports = {
    dbUrl : process.env.MONGODB_URL,
    cert:'/etc/letsencrypt/live/www.srtwit.site/fullchain.pem',
    key: '/etc/letsencrypt/live/www.srtwit.site/privkey.pem',
    portHttp:80,
    portHttps:443
}