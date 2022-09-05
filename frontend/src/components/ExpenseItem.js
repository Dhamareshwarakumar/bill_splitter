import React from 'react'

const ExpenseItem = ({ expense }) => {
    const date = new Date(expense.createdAt);

    return (
        <div className="expense-item">
            <div className="row justify-content-center align-items-center">
                <div className="col-auto d-flex expense-amount-container align-items-center justify-content-center">
                    <div>
                        <h3>{expense.amount}</h3>
                    </div>
                </div>
            </div>
            <p className="text-center">
                {expense.description}
            </p>
            <p className="text-center">
                <i class="bi bi-cash"></i> {expense.paidBy.name}

            </p>
            <div className="d-flex">
                <div className="badge bg-warning">{expense.category}</div>
                <div className="badge bg-secondary ms-auto">{date.toLocaleDateString()}</div>
            </div>
        </div>
    )
}

export default ExpenseItem