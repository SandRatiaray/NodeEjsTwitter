import { app } from '../app';
import session from 'express-session';
import { clientPromise } from '../database';
import MongoStore from 'connect-mongo';

// secret from https://www.uuidgenerator.net/
const secret = '2e3f36e2-b5af-4ed6-966e-0f7649440a23';
const maxAge = 1000 * 60 * 60 * 24 * 14;
const ttl = 60 * 60 * 24 * 14;

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: maxAge,
    },
    store: MongoStore.create({
      clientPromise: clientPromise as any,
      ttl: ttl,
    }),
  })
);
