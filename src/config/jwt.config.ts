import jwt, { JwtPayload } from 'jsonwebtoken';
import { findUserPerId } from '../queries/users.queries';
import { app } from '../app';
import { IUser } from '../interfaces';
import { NextFunction, Request, Response } from 'express';

// secret from https://www.uuidgenerator.net/
const secret = '2e3f36e2-b5af-4ed6-966e-0f7649440a23';
const oneDay = 60 * 60 * 24;

const createJwtToken = (sub: IUser | string | undefined) => {
  if (sub) {
    const checktype = typeof sub === 'string' ? sub : sub._id.toString();
    const jwtToken = jwt.sign(
      {
        sub: checktype,
        exp: Math.floor(Date.now() / 1000) + oneDay,
      },
      secret
    );
    
    return jwtToken;
  }
  return null;
};

exports.createJwtToken = createJwtToken;

const checkExpirationToken = (token:JwtPayload, res: Response) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);

  if (tokenExp) {
    if (nowInSec <= tokenExp) {
      return token;
    } else if (nowInSec > tokenExp && nowInSec - tokenExp < oneDay) {
      const id = token.sub;
      const refreshedToken = createJwtToken(id);

      if (refreshedToken) {
        res.cookie('jwt', refreshedToken);
        return jwt.verify(refreshedToken, secret);
      }
    } else {
      throw new Error('token expired');
    }
  }
  return null;
};

const extractUserFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken:any = jwt.verify(token, secret, {
        ignoreExpiration: true,
      }) 
      checkExpirationToken(decodedToken, res);

      const user = await findUserPerId(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie('jwt');
        res.redirect('/');
      }
    } catch (e) {
      res.clearCookie('jwt');
      res.redirect('/');
    }
  } else {
    next();
  }
};

// middleware helpers
const jwtFeatures = (req: Request, res: Response, next: NextFunction) => {
  // check user
  // req.isAuthenticated = () => !!req.user;
  // created token
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookie('jwt', token);
  };

  req.logout = () => res.clearCookie('jwt');
  next();
};

// middlewares in all queries
app.use(extractUserFromToken);
app.use(jwtFeatures);
