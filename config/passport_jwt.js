const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// import Models
const User = require('../models/User');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload.role === 1) {
            User.findOne({ mobile: jwt_payload.mobile })
                .then(resUser => {
                    if (resUser) {
                        const user = {
                            id: resUser._id,
                            role: resUser.role,
                            name: resUser.name,
                            email: resUser.email,
                            mobile: resUser.mobile
                        };
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => done(err, false));
        } else {
            return done(null, false);
        }
    }));
}