const router = require('express').Router();
const { followUser, signup, signupForm, unfollowUser, uploadImage, userList, userProfile } = require('../controller/users.controler');
const { ensureAuthenticated } = require('../config/guards.config');

router.get('/', userList)
router.get('/follow/:userId', followUser)
router.get('/unfollow/:userId', unfollowUser)
router.get('/:username', userProfile);
router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image', ensureAuthenticated, uploadImage);



module.exports = router;