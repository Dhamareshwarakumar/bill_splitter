import React from 'react';
import { connect } from 'react-redux';


const PendingPayments = ({ transactions, auth, handlePay, groupId }) => {
    return (
        <>
            {transactions.map(transaction => {
                const { from, to, amount } = transaction;
                return (
                    <>
                        {amount !== 0 && (
                            <div className='d-flex bg-info pending-payment my-2 px-2 py-1'>
                                <p>{from.name} have to pay {amount} to {to.name}</p>
                                {auth.user.id === from.userId && (
                                    <button
                                        className='btn btn-outline-warning text-dark ms-auto'
                                        onClick={() => handlePay(groupId, from.userId, to.userId, amount)}
                                    >
                                        pay
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )
            })}
        </>
    )
}


const mapStateToProps = store => ({
    auth: store.auth
});

export default connect(mapStateToProps, null)(PendingPayments)