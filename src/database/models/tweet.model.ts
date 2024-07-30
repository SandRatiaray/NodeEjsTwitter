import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: {
        type: String,
        maxlength: [140, 'trop long'],
        minlength: [1, 'trop court'],
        required: [true, 'You need text to tweet mfk']
    },
    author: { type: Schema.Types.ObjectId, ref: 'user' ,required:true}
});

export const Tweet = mongoose.model('tweet', tweetSchema);

