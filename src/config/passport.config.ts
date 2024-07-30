import { app } from '../app';
import passport from 'passport';
import passportLocal from 'passport-local';
import { findUserPerEmail, findUserPerId } from '../queries/users.queries';
import { IUser } from '../interfaces';

const LocalStrategy = passportLocal.Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await findUserPerEmail(email);
        if (user) {
          const match: boolean = await user.comparePassword(
            password,
            user.local.password
          );
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: 'Wrong Password' });
          }
        } else {
          done(null, false, { message: 'User not fonud' });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
