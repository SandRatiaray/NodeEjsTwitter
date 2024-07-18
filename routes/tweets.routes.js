const router = require('express').Router();
const { tweetList, tweetCreate, tweetNew, tweetDelete, tweetEdit,tweetUpdate } = require('../controller/tweets.controller')

router.get('/', tweetList);
router.get('/new',tweetNew);
router.post('/', tweetCreate);
router.get('/edit/:tweetId', tweetEdit)
router.post('/update/:tweetId', tweetUpdate)
router.delete('/:tweetId', tweetDelete);

module.exports = router;