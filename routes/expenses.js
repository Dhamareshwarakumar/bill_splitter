const express = require('express');
const router = express.Router();
const passport = require('passport');
const Group = require('../models/Group');

const { validateExpense } = require('../validations/expenses');

const Expense = require('../models/Expense');

//adding another variable for simplicity
const extra = require('../models/Extra');


// Routes   :: GET /api/expenses/group/:id
// Desc     :: Get all expenses in a group
// Access   :: Private (Group Member)
// TODO: Check if the querying user is a member of the group
router.get(
    '/group/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Expense.find({ groupId: req.params.id })
            .populate('paidBy', ['name'])
            .then(expenses => {
                if (expenses.length) {
                    return res.json(expenses);
                } else {
                    return res.status(400).json({ msg: "No expenses found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    }
);


// Routes   :: GET /api/expenses/user/:id
// Desc     :: Get all expenses done by a user
// Access   :: Private (Self)
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ msg: "Get all expenses in a group" });
    }
);


// Routes   :: POST /api/expenses
// Desc     :: Add an expense to a group
// Access   :: Private (Group Member)
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateExpense,
    (req, res) => {
        // Check if group exists
        Group.findById(req.body.groupId)
            .then(group => {
                if (group) {
                    // check if the user is a member of the group
                    if (group.members.filter(member => member.id.toString() === req.user.id).length.toString()) {
                        // Check if the paying person is a member of the group
                        if (group.members.filter(member => member.id.toString() === req.body.paidBy).length) {
                            const newExpense = new Expense({
                                groupId: req.body.groupId,
                                description: req.body.description,
                                category: req.body.category,
                                amount: req.body.amount,
                                paidBy: req.body.paidBy
                            });

                            newExpense.save()
                                .then(expense => res.json({ msg: "Expense Added", expense }))
                                .catch(err => res.json({ msg: "Internal Server Error", err }));
                        } else {
                            return res.status(400).json({ msg: "Paying person is not a member of the group" });
                        }
                    } else {
                        return res.status(401).json({ msg: "You are not a member of this group" });
                    }
                } else {
                    return res.status(400).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.json({ msg: "Internal Server Error", err }));
    }
);


// Routes   :: PUT /api/expenses/:id
// Desc     :: Update an expense in a group
// Access   :: Private (Group Member)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ msg: "Update an expense in a group" });
    }
);


// Routes   :: DELETE /api/expenses/:id
// Desc     :: Delete an expense in a group
// Access   :: Private (Group Member)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ msg: "Delete an expense in a group" });
    }
);

module.exports = router;
