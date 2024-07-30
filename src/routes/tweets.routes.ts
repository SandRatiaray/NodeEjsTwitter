import { Router } from 'express';
import {
  tweetList,
  tweetCreate,
  tweetNew,
  tweetDelete,
  tweetEdit,
  tweetUpdate,
} from '../controller/tweets.controller';

const router = Router();

router.get('/', tweetList);
router.get('/new', tweetNew);
router.post('/', tweetCreate);
router.get('/edit/:tweetId', tweetEdit);
router.post('/update/:tweetId', tweetUpdate);
router.delete('/:tweetId', tweetDelete);

export default router;
