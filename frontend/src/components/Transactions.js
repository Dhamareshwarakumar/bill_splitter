import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Details from '../components/Details';
import PendingPayments from './PendingPayments';

const Transactions = ({ expenses, members, groupId, auth }) => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get('/api/transactions/group/' + groupId)
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    console.log(payments);

    const getTotalGrpExpense = () => {
        let amount = 0;
        expenses.length !== 0 && expenses.forEach(expense => {
            amount += expense.amount;
        });
        return amount;
    }

    const getMemberExpense = (memberId) => {
        let amount = 0;
        expenses.length !== 0 && expenses.forEach(expense => {
            if (expense.paidBy._id === memberId) {
                amount += expense.amount;
            }
        });
        return amount;
    }

    const eachShare = getTotalGrpExpense() / members.length;

    let shares = {}
    let totalWillGet = 0;
    members.forEach(member => {
        let memberExpense = getMemberExpense(member.id._id);
        let willGet = 0
        let willPay = 0
        if (memberExpense > eachShare) {
            willGet = memberExpense - eachShare;
            totalWillGet += willGet;
        } else if (memberExpense < eachShare) {
            willPay = eachShare - memberExpense;
        }

        shares[member.id._id] = {
            name: member.id.name,
            userId: member.id._id,
            willGet,
            willPay,
            alreadyPaid: 0,
            alreadyGot: 0
        }
    });


    let transactions = [];
    Object.keys(shares).forEach(key1 => {
        if (shares[key1].willGet) {
            const myShare = shares[key1].willGet / totalWillGet;
            Object.keys(shares).forEach(key2 => {
                if (shares[key2].willPay) {
                    const amount = myShare * shares[key2].willPay;
                    transactions.push({
                        from: {
                            name: shares[key2].name,
                            userId: shares[key2].userId
                        },
                        to: {
                            name: shares[key1].name,
                            userId: shares[key1].userId
                        },
                        amount
                    })
                }
            })

        }
    })


    payments.forEach(payment => {
        shares[payment.from._id].alreadyPaid += payment.amount;
        shares[payment.to._id].alreadyGot += payment.amount;
    });

    payments.forEach(payment => {
        let transactionFound = false;
        transactions.forEach(transaction => {
            if ((payment.from._id === transaction.from.userId) && (payment.to._id === transaction.to.userId)) {
                transactionFound = true;
                transaction.amount -= payment.amount;
                if (transaction.amount < 0) {
                    let temp = transaction.from;
                    transaction.from = transaction.to;
                    transaction.to = temp;
                    transaction.amount = -transaction.amount;
                }
            } else if ((payment.from._id === transaction.to.userId) && (payment.to._id === transaction.from.userId)) {
                transactionFound = true;
                transaction.amount += payment.amount;
            }
        })
        if (!transactionFound) {
            transactions.push({
                from: {
                    name: payment.to.name,
                    userId: payment.to._id
                },
                to: {
                    name: payment.from.name,
                    userId: payment.from._id
                },
                amount: payment.amount
            })
        }
    })
    console.log(transactions);

    const handlePay = (groupId, from, to, amount) => {
        console.log('paying', amount)
        axios.post('/api/transactions', {
            groupId,
            from,
            to,
            amount
        })
            .then(res => {
                axios.get('/api/transactions/group/' + groupId)
                    .then(res => {
                        setPayments(res.data);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }






    members.forEach(member => {
        shares[member.id._id].willGet = 0;
        shares[member.id._id].willPay = 0;
    });
    // recalculating shares
    transactions.forEach(transaction => {
        shares[transaction.from.userId].willPay += transaction.amount;
        shares[transaction.to.userId].willGet += transaction.amount;
    })

    return (
        <div>
            <div className="row">
                {Object.keys(shares).map(memberId => {
                    const { name, willGet, willPay, alreadyPaid, alreadyGot } = shares[memberId];
                    return (
                        <>
                            <div className="col-md-4 my-2">
                                <Details
                                    name={name}
                                    willGet={(willGet) > 0.0001 ? (willGet).toFixed(2) : 0}
                                    willPay={(willPay).toFixed(2)}
                                    alreadyPaid={alreadyPaid.toFixed(2)}
                                    alreadyGot={alreadyGot.toFixed(2)}
                                    expense={getMemberExpense(memberId).toFixed(2)}
                                    share={eachShare.toFixed(2)}
                                    transactions={transactions}
                                />
                            </div>
                        </>
                    )
                })}
            </div>

            <PendingPayments transactions={transactions} handlePay={handlePay} groupId={groupId} />
        </div>
    )
}

const mapStateToProps = store => ({
    auth: store.auth
});

export default connect(mapStateToProps, null)(Transactions)