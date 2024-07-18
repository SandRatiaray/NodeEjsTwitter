const mongoose = require('mongoose');
const env = require(`../environment/${process.env.NODE_ENV}`)
console.log(env);

//database connexion
exports.clientPromise = mongoose
    .connect(env.dbUrl)
    .then((m) => {
        console.log('connect DB ok!');
        return m;
    })
    .catch((err) => {
        console.log(err)
    });
