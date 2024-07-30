//requirement
import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import { join } from 'path';
// import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';

import index from './routes';
import './database';

//API initialisation
export const app: Application = express();

//templating initialisation
app.set('views', join(__dirname, '../views'));
app.set('view engine', 'pug');

// session config
import './config/session.config';
import './config/passport.config';

// jwt Config
// app.use(cookieParser());
// import './config/jwt.config';

//middleware form/json/public folder
app.use(morgan('short'));
app.use(express.static(join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(index);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err: any, _: Request, res: Response) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}
