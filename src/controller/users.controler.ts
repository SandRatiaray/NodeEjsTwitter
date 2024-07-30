import {
  addUserIdToCurrentUserFollowing,
  createUser,
  findUserPerUsername,
  removeUserIdToCurrentUserFollowing,
  searchUsersPerUsername,
  findUserPerId,
} from '../queries/users.queries';
import { getUserTweetsFromAuthorId } from '../queries/tweets.queries';
import { NextFunction, Response, Request } from 'express';
import { join } from 'path';
import multer from 'multer';
type File = Express.Multer.File;

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __: File, cb: Function) => {
      cb(null, join(__dirname, '../public/images/avatars'));
    },
    filename: (_, file: File, cb: Function) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const userProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    if (user) {
      const tweets = await getUserTweetsFromAuthorId(user._id);
      res.render('tweets/tweet', {
        tweets,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
        user,
        editable: false,
      });
    } else {
      res.redirect('/');
    }
  } catch (e) {
    next(e);
  }
};

export const userList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string;
    const users = await searchUsersPerUsername(search);
    res.render('includes/search_menu', { users });
  } catch (e) {
    next(e);
  }
};

export const signupForm = (req: Request, res: Response) => {
  res.render('users/user_form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

export const signup = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await createUser(body);

    res.redirect('/');
  } catch (e: any) {
    res.render('users/user_form', {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

export const uploadImage = [
  upload.single('avatar'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (user) {
        user.avatar = `/images/avatars/${req.file!.filename}`;
        await user.save();
        res.redirect('/');
      } else {
        res.end();
      }
    } catch (e) {
      next(e);
    }
  },
];

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      addUserIdToCurrentUserFollowing(req.user!, userId),
      findUserPerId(userId),
    ]);
    if (user) {
      res.redirect(`/users/${user.username}`);
    } else {
      res.redirect('/');
    }
  } catch (e) {
    next(e);
  }
};

export const unfollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      removeUserIdToCurrentUserFollowing(req.user!, userId),
      findUserPerId(userId),
    ]);
    if (user) {
      res.redirect(`/users/${user.username}`);
    } else {
      res.redirect('/');
    }
  } catch (e) {
    next(e);
  }
};
