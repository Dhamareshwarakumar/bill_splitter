import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Payments = () => {
    const params = useParams();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get('/api/transactions/group/' + params.groupId)
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    console.log(payments);
    return (
        <div className="container">
            {payments.length !== 0 && payments.map(payment => (
                <div className="row my-2 bg-info text-center py-2 justify-content-start" style={{ borderRadius: "10px" }}>
                    <div className="col-3">{payment.from.name}</div>
                    <div className="col 1"> <b>{'>>'}</b> </div>
                    <div className="col-3">{payment.amount}</div>
                    <div className="col-1"> <b>{'>>'}</b> </div>
                    <div className="col-3">{payment.to.name}</div>
                </div>
            ))}

        </div>
    )
}

export default Payments