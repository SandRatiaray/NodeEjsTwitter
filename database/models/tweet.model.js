const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        maxlength: [140, 'trop long'],
        minlength: [1, 'trop court'],
        required: [true, 'You need text to tweet mfk']
    },
    author: { type: schema.Types.ObjectId, ref: 'user' ,required:true}
});
const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;