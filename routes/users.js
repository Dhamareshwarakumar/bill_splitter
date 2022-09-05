const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


// import Validations
const { validateUser, validateUserLogin, validateSelf } = require('../validations/user');

// import Models
const User = require('../models/User');


// Route    :: GET /api/users
// Desc     :: Send the list of all users
// Access   :: Public
router.get(
    '/',
    (req, res) => {
        User.find()
            .then(users => {
                if (users.length) {
                    return res.json(users.map(user => ({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                    })));
                } else {
                    return res.status(400).json({ msg: "No users found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    });


// Route    :: GET /api/users/:mobile
// Desc     :: Send the user with the given mobile number
// Access   :: Public
router.get(
    '/:mobile',
    (req, res) => {
        User.findOne({ mobile: req.params.mobile })
            .then(user => {
                if (user) {
                    return res.json({
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                    });
                } else {
                    return res.status(400).json({ msg: "No user found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    }
);


// Route   :: POST /api/users
// Desc    :: Create a new user
// Access  :: Public
router.post(
    '/',
    validateUser,
    (req, res) => {
        User.findOne({ mobile: req.body.mobile })
            .then(user => {
                if (user) {
                    return res.status(400).json({ msg: 'User already exists' });
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: req.body.password
                    });
                    console.log(newUser);
                    newUser.save()
                        .then(user => res.json({ msg: "User Added Successfully", user }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// TODO:
// Route   :: PUT /api/users/:mobile
// Desc    :: Update the user with the given mobile number
// Access  :: Private (Self only)
router.put(
    '/:mobile',
    passport.authenticate('jwt', { session: false }),
    validateSelf,
    (req, res) => {
        User.findOne({ mobile: req.params.mobile })
            .then(user => {
                if (user) {
                    req.body.name && (user.name = req.body.name);
                    req.body.email && (user.email = req.body.email);
                    req.body.password && (user.password = req.body.password);
                    user.save()
                        .then(user => res.json({ msg: "User Updated Successfully", user }))
                        .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                } else {
                    return res.status(400).json({ msg: "No user found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// TODO:
// Route   :: DELETE /api/users/:mobile
// Desc    :: Delete the user with the mobile number
// Access  :: Private (Self only)
router.delete(
    '/:mobile',
    passport.authenticate('jwt', { session: false }),
    validateSelf,
    (req, res) => {
        User.findOneAndDelete({ mobile: req.params.mobile })
            .then(user => {
                if (user) {
                    return res.json({ msg: "User deleted successfully", user });
                } else {
                    return res.status(400).json({ msg: "No user found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// Route   :: POST /api/users/login
// Desc    :: User Login
// Access  :: Public
router.post(
    '/login',
    validateUserLogin,
    (req, res) => {
        User.findOne({ mobile: req.body.mobile })
            .then(user => {
                if (user) {
                    if (user.authenticate(req.body.password)) {
                        const payload = {
                            id: user._id,
                            role: user.role,
                            name: user.name,
                            email: user.email,
                            mobile: user.mobile
                        };

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' },
                            (err, token) => {
                                if (err) {
                                    return res.status(500).json({ msg: "Internal Server Error", err });
                                }
                                return res.json({ msg: "Login Successful", token: `Bearer ${token}` });
                            }
                        );
                    } else {
                        return res.status(400).json({ msg: "Invalid Credentials" });
                    }
                } else {
                    return res.status(400).json({ msg: "Invalid Credentials" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


module.exports = router;