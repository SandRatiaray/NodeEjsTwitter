const app = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserPerEmail, findUserPerId } = require('../queries/users.queries')


app.use(passport.initialize()); //init mandatory
app.use(passport.session()); //session with passport


// save only the _id in session
passport.serializeUser((user, done) => {
    done(null, user._id);
})

// revocer the _id and put it in req.user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserPerId(id)
        done(null, user)
    } catch (e) {
        done(e);
    }
})

// conig local strategy with email s identifier 
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // comparison between hashpassword and input password by the user 
        const user = await findUserPerEmail(email);
        if (user) {
            const match = user.comparePassword(password);
            if (match) {
                done(null, user);
            } else {
                // error return
                done(null, false, { message: 'Wrong password' })
            }
        } else {
            // error return
            done(null, false, { message: 'User not found' })
        }
    } catch (e) {
        done(e)
    }
}))