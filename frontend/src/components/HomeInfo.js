import React from 'react'

const HomeInfo = ({ willPay, willGet, balance }) => {
    return (
        <div className="col-10 col-md-6 my-3 p-3 home_info_container">
            <div className="row align-items-stretch">
                <div className="col-4 text-center">
                    ${willPay} <br />
                    <b>Will Pay</b>
                </div>
                <div className="col-4 text-center">
                    ${willGet} <br />
                    <b>Will Get</b>
                </div>
                <div className="col-4 text-center">
                    ${balance} <br />
                    <b>Balance</b>
                </div>
            </div>
        </div>
    )
}

export default HomeInfo