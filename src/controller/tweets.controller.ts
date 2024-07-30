import { NextFunction, Request, Response } from 'express';
import {
  getCurrentUserTweetWithFollowing,
  createTweet,
  deleteTweet,
  getTweet,
  updateTweet,
} from '../queries/tweets.queries';

export const tweetList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const tweets = await getCurrentUserTweetWithFollowing(req.user!);
      res.render('tweets/tweet', {
        tweets,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
        user: req.user,
        editable: true,
      });
  } catch (e) {
    next(e);
  }
};

export const tweetNew = (req: Request, res: Response) => {
  res.render('tweets/tweet_form', {
    tweet: {},
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

export const tweetCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await createTweet({ ...body, author: req.user!._id });
    res.redirect('/tweets');
  } catch (e: any) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render('tweets/tweet_form', {
      errors,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

export const tweetDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);
    const tweets = await getCurrentUserTweetWithFollowing(req.user!);
    res.render('tweets/tweet_list', {
      tweets,
      currentUser: req.user,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

export const tweetEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    res.render('tweets/tweet_form', {
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

export const tweetUpdate = async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId;
  try {
    const body = req.body;
    await updateTweet(tweetId, body);
    res.redirect('/tweets');
  } catch (e: any) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet_form', {
      errors,
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
