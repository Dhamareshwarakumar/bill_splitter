import React from 'react'

const ExpenditureItem = ({ amount, date, category, description }) => {
    return (
        <div className="col-10 home_expenditure py-1">
            <div className="row px-3 py-1 justify-content-between">
                <div className="col-auto">${amount}</div>
                <div className="col-auto">{date}</div>
            </div>
            <div className="row px-3 py-1">
                <div className="col-auto badge rounded-pill text-bg-warning">{category}</div>
                <div className="col-auto">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default ExpenditureItem