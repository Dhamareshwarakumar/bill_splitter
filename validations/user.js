const { isEmpty, trimmer } = require('./myValidator');
const { NAME_REGEX, EMAIL_REGEX, MOBILE_REGEX } = require('./regex');


const validateUser = (req, res, next) => {
    errors = {};

    // Trim the inputs
    req.body = trimmer(req.body);

    // Validate Name
    if (isEmpty(req.body.name)) {
        errors.name = 'Name is required';
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors.name = 'Name must be 3-256 characters long and contain only alphabets & Spaces';
    }

    // Validate Email
    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    // Validate Mobile
    if (isEmpty(req.body.mobile)) {
        errors.mobile = 'Mobile is required';
    } else if (!MOBILE_REGEX.test(req.body.mobile)) {
        errors.mobile = 'Mobile is invalid';
    }

    // Validate Password
    if (isEmpty(req.body.password)) {
        errors.password = 'Password is required';
    } else if (req.body.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: 'Validation Failed', err: errors });
    }

    next();
}


const validateUserLogin = (req, res, next) => {
    errors = {};

    // Validate Mobile
    if (isEmpty(req.body.mobile)) {
        errors.mobile = 'Mobile Number is required';
    } else if (!MOBILE_REGEX.test(req.body.mobile)) {
        errors.mobile = 'Mobile Number is invalid';
    }

    // Validate Password
    if (isEmpty(req.body.password)) {
        errors.password = 'Password is required';
    }


    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: 'Validation Failed', err: errors });
    }

    next()
}

const validateSelf = (req, res, next) => {
    if (req.user.role === 1) {
        if (req.user.mobile === req.params.mobile) {
            next();
        } else {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
}

module.exports = {
    validateUser,
    validateUserLogin,
    validateSelf
}