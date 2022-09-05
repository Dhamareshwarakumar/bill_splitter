const { isEmpty, trimmer } = require('./myValidator');


const validateTransaction = (req, res, next) => {
    errors = {};

    // Validate Group ID
    if (isEmpty(req.body.groupId)) {
        errors.groupId = 'Group ID is required';
    }

    // Validate From
    if (isEmpty(req.body.from)) {
        errors.from = 'From is required';
    }

    // Validate To
    if (isEmpty(req.body.to)) {
        errors.to = 'To is required';
    }

    // Validate Amount
    if (isEmpty(req.body.amount)) {
        errors.amount = 'Amount is required';
    } else if (isNaN(req.body.amount)) {
        errors.amount = 'Amount must be a number';
    } else if (req.body.amount <= 0) {
        errors.amount = 'Amount must be a positive number';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: "Validation Failed", errors });
    }

    next();
};

const checkSelf = (req, res, next) => {
    if (req.body.from != req.user.id) {
        return res.status(400).json({ msg: "You are not authorized" });
    }

    next();
}

module.exports = {
    validateTransaction,
    checkSelf
}