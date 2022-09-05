const { isEmpty, trimmer } = require('./myValidator');


const validateExpense = (req, res, next) => {
    errors = {};

    req.body = trimmer(req.body);

    // Validate GroupId
    if (isEmpty(req.body.groupId)) {
        errors.groupId = 'Group Id is required';
    }

    // Validate Description
    if (isEmpty(req.body.description)) {
        errors.description = 'Description is required';
    } else if (req.body.description.length < 3 || req.body.description.length > 50) {
        errors.description = 'Description must be between 3 and 50 characters';
    }

    // Validate Category
    if (isEmpty(req.body.category)) {
        errors.category = 'Category is required';
    } else if (req.body.category.length < 3 || req.body.category.length > 32) {
        errors.category = 'Category must be between 3 and 32 characters';
    }

    // Validate Amount
    if (isEmpty(req.body.amount)) {
        errors.amount = 'Amount is required';
    } else if (isNaN(req.body.amount)) {
        errors.amount = 'Amount must be a number';
    } else if (req.body.amount <= 0) {
        errors.amount = 'Amount must be greater than 0';
    }

    // Validate paidBy User
    if (isEmpty(req.body.paidBy)) {
        errors.paidBy = 'Paid By is required';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json({ msg: "Valiodation Failed", errors });
    }

    next();
}


module.exports = {
    validateExpense
};