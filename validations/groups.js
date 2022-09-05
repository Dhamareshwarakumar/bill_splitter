const { isEmpty } = require('./myValidator');

const validateCreateGroup = (req, res, next) => {
    errors = {};

    // TODO: At every validation check data type also
    // Check if name is empty
    if (isEmpty(req.body.name)) {
        errors.name = 'Name is required';
    }

    // Check if members is empty
    if (isEmpty(req.body.members)) {
        errors.members = 'Members are required';
    }

    // TODO: Check the current logged in user is in the members array

    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: "Validation Failed", err: errors });
    }

    next();
}


module.exports = {
    validateCreateGroup
}