import React from 'react'

const TotalExpense = ({ amount, getTotalGrpExpense }) => {
    return (

        <div className="row align-items-center px-3 py-2 my-3 home_info_container">
            <div className="col-8">
                <h3>Total Expense</h3>
            </div>
            <div className="col-4">
                <h3 className='text-warning'>$ {getTotalGrpExpense()}</h3>
            </div>
        </div>
    )
}

export default TotalExpense