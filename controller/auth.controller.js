const { findUserPerEmail } = require('../queries/users.queries');

exports.signinForm = (req, res, next) => {
    res.render('auth/auth_form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user
    })
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserPerEmail(email);
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                req.login(user);
                res.redirect('/tweets')
            } else {
                res.render('auth/auth_form', {
                    errors: { message: 'Wrong password' },
                    currentUser: req.user,
                    isAuthenticated:req.isAuthenticated()
                });
            }
        } else {
            res.render('auth/auth_form', {
                errors: { message: 'User not found' }
            });

        }
    } catch (e) {
        next(e);
    }
}

exports.signout = (req, res, next) => {
    req.logout();
    res.redirect('/auth/signin/form');
}