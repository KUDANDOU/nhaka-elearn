const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../../models/users.model');

exports.passportConfig = () => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findByCredentials(username, (err, user) => {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {message: 'Invalid Username or Password'});
                }
                User.comparePassword(password, user.password, (isMatch) => {
                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid Username or Password'});
                    }
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.getUserById(id, {'_id': 1, 'name': 1, 'username': 1, 'email': 1, 'profileImg.filename': 1}, (err, user) => {
            done(err, user);
        });
    });
};
