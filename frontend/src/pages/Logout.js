import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Logout = props => {
    const navigate = useNavigate();

    useEffect(() => {
        props.logout(navigate);
    }, [props, navigate]);


    return (
        <div>Logout</div>
    )
}

export default connect(null, { logout })(Logout)