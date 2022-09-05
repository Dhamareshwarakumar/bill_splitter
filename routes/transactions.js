const express = require('express');
const router = express.Router();
const passport = require('passport');

const Transaction = require('../models/Transaction');
const Group = require('../models/Group');
const { validateTransaction, checkSelf } = require('../validations/transactions');


// @route   GET api/transactions/group/:groupId
// @desc    Get all transactions of a group
// @access  Private (only group members)
router.get(
    '/group/:groupId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Group.findById(req.params.groupId)
            .then(group => {
                if (group) {
                    if (group.members.filter(member => member.id.toString() === req.user.id.toString()).length) {
                        Transaction.find({ groupId: req.params.groupId })
                            .populate('from', ['name'])
                            .populate('to', ['name'])
                            .populate('groupId', ['name'])
                            .then(transactions => {
                                if (transactions.length) {
                                    return res.json(transactions);
                                } else {
                                    return res.status(400).json({ msg: 'No transactions found' });
                                }
                            })
                            .catch(err => res.status(500).json({ msg: 'Internal Server Error' }));
                    }
                } else {
                    return res.status(404).json({ msg: "Group not found" });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


// @route   POST api/transactions
// @desc    Add a transaction
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateTransaction,
    checkSelf,
    (req, res) => {
        // Check if Group Exists
        Group.findById(req.body.groupId)
            .then(group => {
                if (group) {
                    // check if from and to are members of the group
                    let fromStatus = false;
                    let toStatus = false;
                    group.members.forEach(member => {
                        if (member.id.toString() === req.body.from) {
                            fromStatus = true;
                        }
                        if (member.id.toString() === req.body.to) {
                            toStatus = true;
                        }
                    });
                    if (fromStatus && toStatus) {
                        const newTransaction = new Transaction({
                            groupId: req.body.groupId,
                            from: req.body.from,
                            to: req.body.to,
                            amount: req.body.amount
                        });

                        newTransaction.save()
                            .then(transaction => res.json({ msg: "Transaction Successful", transaction }))
                            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
                    }
                } else {
                    return res.status(400).json({ msg: 'Group not found' });
                }
            })
            .catch(err => res.status(500).json({ msg: "Internal Server Error", err }));
    }
);


module.exports = router;