import mongoose from 'mongoose';
import conf from '../environment';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

//database connexion
export const clientPromise = mongoose
  .connect(env.dbUrl)
  .then((m) => {
    console.log('connect DB ok!');
    return m.connection.getClient();
  })
  .catch((err) => {
    console.log(err);
  });
