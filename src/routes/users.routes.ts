import { Router } from 'express';
import {
  followUser,
  signup,
  signupForm,
  unfollowUser,
  uploadImage,
  userList,
  userProfile,
} from '../controller/users.controler';
import { ensureAuthenticated } from '../config/guards.config';
ensureAuthenticated

const router = Router();

router.get('/', userList);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unfollowUser);
router.get('/:username', userProfile);
router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image',ensureAuthenticated, uploadImage);

export default  router;
