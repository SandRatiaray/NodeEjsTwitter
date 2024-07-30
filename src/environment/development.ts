import { join } from 'path';

export default {
  dbUrl: 'mongodb+srv://sratiaray:No%40h19110715@cluster0.qxqlpuo.mongodb.net/twitter?retryWrites=true',
  cert: join(__dirname, '../../ssl/local.crt'),
  key: join(__dirname, '../../ssl/local.key'),
  portHttp: 3000,
  portHttps: 3001,
};
