const path = require('path');
const dotenv = require('dotenv').config();

module.exports = {    
    dbUrl : process.env.MONGODB_URL,
    cert: path.join(__dirname, '../ssl/local.crt'),
    key: path.join(__dirname,'../ssl/local.key'),
    portHttp:3000  ,
    portHttps:3001
}