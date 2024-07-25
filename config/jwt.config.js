const jwt = require('jsonwebtoken');
const { findUserPerId } = require('../queries/users.queries');
const app = require('../app');

// secret from https://www.uuidgenerator.net/
const secret = "2e3f36e2-b5af-4ed6-966e-0f7649440a23";
const expDayToken = 2;
const oneDay = 60 * 60 * 24;


const createJwtToken = ({ user = null, id = null }) => {
    const jwtToken = jwt.sign({
        sub: id || user._id.toString(),
        exp: Math.floor(Date.now() / 1000) + oneDay
    },
        secret);
    return jwtToken;
}

exports.createJwtToken = createJwtToken;

const checkExpirationToken = (token, res) => {
    const tokenExp = token.exp;
    const nowInSec = Math.floor(Date.now() / 1000);

    if (nowInSec <= tokenExp) {

        return token;

    } else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < oneDay)) {
        const refreshedToken = createJwtToken({ id: token.sub });
        
        res.cookie('jwt', refreshedToken);

         return jwt.verify(refreshedToken, secret);
    
    } else {
        throw new Error('token expired')
    }

}


const extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });
            if(decodedToken) {
                checkExpirationToken(decodedToken,res);
            }
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
}

// middleware helpers
const jwtFeatures = (req, res, next) => {
    // check user
    req.isAuthenticated = () => !!req.user;
    // created token
    req.login = (user) => {
        const token = createJwtToken({ user });
        res.cookie('jwt', token);
    }
    req.logout = () => res.clearCookie('jwt')
    next();
}

// middlewares in all queries
app.use(extractUserFromToken);
app.use(jwtFeatures);