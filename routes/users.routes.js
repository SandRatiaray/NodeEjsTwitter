const router = require('express').Router();
const { signup, signupForm, uploadImage, userList, userProfile } = require('../controller/users.controler');
const { ensureAuthenticated } = require('../config/guards.config');

router.get('/', userList)
router.get('/:username', userProfile);
router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image', ensureAuthenticated, uploadImage);



module.exports = router;