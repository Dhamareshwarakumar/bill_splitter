import React from 'react'

const Details = ({ name, willGet, willPay, alreadyPaid, alreadyGot, expense, share, transactions }) => {
    return (
        <div className="details border border-info">
            <div className="details-header bg-info p-2 text-center">
                {name}
            </div>
            <div className="details-body">
                <div className="row gap-2 my-2 justify-content-center">
                    <div className="col-auto py-1 details-body-pills">
                        Expense: {expense}
                    </div>
                    <div className="col-auto py-1 details-body-pills">Share: {share}</div>
                </div>
                <div className="row gap-2 my-2 justify-content-center">
                    <div className="col-auto py-1 details-body-pills">Already Paid: {alreadyPaid}</div>
                    <div className="col-auto py-1 details-body-pills">Already Got: {alreadyGot}</div>
                </div>
                <div class="accordion accordion-flush" id={`${name.split(' ')[0]}-accordian`}>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id={`${name.split(' ')[0]}-willGet-heading`}>
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${name.split(' ')[0]}-willGet`} aria-expanded="false" aria-controls={`${name.split(' ')[0]}-willGet`}>
                                Will Get: {willGet}
                            </button>
                        </h2>
                        <div id={`${name.split(' ')[0]}-willGet`} class="accordion-collapse collapse" aria-labelledby={`${name.split(' ')[0]}-willGet-heading`} data-bs-parent={`#${name.split(' ')[0]}-willGet`}>
                            <div class="accordion-body">
                                {transactions.map((transaction, index) => ((transaction.to.name === name) && transaction.amount !== 0) && (
                                    <div key={index} className="row justify-content-center">
                                        <div className="col-8 text-end"> {transaction.from.name}</div>
                                        <div className="col-auto"> : </div>
                                        <div className="col-3"> {transaction.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id={`${name.split(' ')[0]}-willPay-heading`}>
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${name.split(' ')[0]}-willpay`} aria-expanded="false" aria-controls={`${name.split(' ')[0]}-willpay`}>
                                Will Pay: {willPay}
                            </button>
                        </h2>
                        <div id={`${name.split(' ')[0]}-willpay`} class="accordion-collapse collapse" aria-labelledby={`${name.split(' ')[0]}-willPay-heading`} data-bs-parent={`${name.split(' ')[0]}-willpay`}>
                            <div class="accordion-body">
                                {transactions.map((transaction, index) => ((transaction.from.name === name) && (transaction.amount !== 0)) && (
                                    <div key={index} className="row justify-content-center">
                                        <div className="col-8 text-end"> {transaction.to.name}</div>
                                        <div className="col-auto"> : </div>
                                        <div className="col-3"> {transaction.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details