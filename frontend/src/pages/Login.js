import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";

import { userLogin } from '../actions/authActions';
import { isEmpty } from '../validations/isEmpty';

const Login = props => {
    const navigate = useNavigate();
    const [pageType, setPageType] = useState('login');
    const initialState = {
        name: '',
        email: '',
        mobile: '',
        password: ''
    }
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    // Redirect to Home Page if User is Logged In
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate('/');
        }
        if (isEmpty(props.errors)) {
            setErrors(initialState);
        } else {
            if (props.errors.msg === 'Invalid Credentials') {
                setErrors({
                    ...initialState,
                    password: 'Invalid Credentials'
                });
            } else if (props.errors.msg === 'Validation Failed') {
                setErrors(props.errors.err);
            } else {
                setErrors(initialState);
            }
            toast.error(props.errors.msg)
        }
    }, [props, navigate]);

    const togglePageType = () => {
        setPageType(pageType === 'login' ? 'register' : 'login');
        setErrors(initialState);
    }

    const handleFormFields = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleForm = e => {
        e.preventDefault();

        if (pageType === 'register') {
            axios.post('/api/users', form)
                .then(res => {
                    toast.success(res.data.msg);
                    togglePageType();
                    setErrors(initialState);
                })
                .catch(err => {
                    if (err.response.data.msg === 'Validation Failed') {
                        setErrors(err.response.data.err);
                    } else if (err.response.data.msg === 'User already exists') {
                        setErrors({
                            ...initialState,
                            mobile: 'User already exists'
                        });
                    } else {
                        setErrors(initialState);
                    }
                    toast.error(err.response.data.msg)
                });
        } else {
            props.userLogin({
                mobile: form.mobile,
                password: form.password
            }, navigate);
            // axios.post('/api/users/login', {
            //     mobile: form.mobile,
            //     password: form.password
            // })
            //     .then(res => {
            //         toast.success(res.data.msg);
            //         setErrors(initialState);
            //     })
            //     .catch(err => {
            // if (err.response.data.msg === 'Invalid Credentials') {
            //     setErrors({
            //         ...initialState,
            //         password: 'Invalid Credentials'
            //     });
            // } else if (err.response.data.msg === 'Validation Failed') {
            //     setErrors(err.response.data.err);
            // } else {
            //     setErrors(initialState);
            // }
            // toast.error(err.response.data.msg)
            //     })
        }
    }

    return (
        <>
            <form method="POST">
                {/* Page Color Divider */}
                <div className="login_page_divider"></div>
                {/* Landing Section */}
                <div className="container">
                    <div className="row login_landing">
                        {/* Landing Section -- Card */}
                        <div className="card login_landing_card">
                            <h3 className="text-center display-4 login_heading m-md-4">
                                User <span className="text-primary">
                                    {pageType === 'login' ? 'Login' : 'Signup'}
                                </span>
                            </h3>

                            {/* Landing Section -- Card -- Main Area */}
                            <div className="container ">
                                <div className="row align-items-center justify-content-center login_landing_card_main">
                                    {/* Landing Section --Card -- Main Area -- Image */}
                                    <div className="col-md-6">
                                        <img src="/img/login.png" alt="Login SVG" style={{ width: "100%", height: "auto" }} />
                                    </div>
                                    {/* Landing Section --Card -- Main Area -- Form */}
                                    <div className="col-12 col-md-6">
                                        <p className="text-center d-none d-md-block" style={{ fontSize: "2rem" }} >Bill <span className="text-primary">Splitter</span></p>
                                        {/* Landing Section --Card -- Main Area -- Form -- Input Field */}
                                        {pageType === 'register' && (
                                            <div className="form-group mb-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className={classnames("form-control", {
                                                        'is-invalid': errors.name
                                                    })}
                                                    placeholder="Name"
                                                    style={{ borderRadius: "20px" }}
                                                    value={form.name}
                                                    onChange={handleFormFields}
                                                />
                                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                            </div>
                                        )}
                                        {pageType === 'register' && (
                                            <div className="form-group mb-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={classnames("form-control", {
                                                        'is-invalid': errors.email
                                                    })}
                                                    placeholder="Email"
                                                    style={{ borderRadius: "20px" }}
                                                    value={form.email}
                                                    onChange={handleFormFields}
                                                />
                                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                            </div>
                                        )}
                                        <div className="form-group mb-2">
                                            <input
                                                type="text"
                                                name="mobile"
                                                id="mobile"
                                                className={classnames("form-control", {
                                                    'is-invalid': errors.mobile
                                                })}
                                                placeholder="Mobile Number"
                                                style={{ borderRadius: "20px" }}
                                                value={form.mobile}
                                                onChange={handleFormFields}
                                            />
                                            {errors.mobile && (<div className="invalid-feedback">{errors.mobile}</div>)}
                                        </div>
                                        <div className="form-group mb-2">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className={classnames("form-control", {
                                                    'is-invalid': errors.password
                                                })}
                                                placeholder="Password"
                                                style={{ borderRadius: "20px" }}
                                                value={form.password}
                                                onChange={handleFormFields}
                                            />
                                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                        </div>
                                        <button type="button" onClick={handleForm} className="btn btn-outline-primary btn-block" style={{ borderRadius: "50px", width: "100%" }}>
                                            {pageType === 'login' ? 'Login' : 'Signup'}
                                        </button>
                                        <p className='mt-1 wmt-md-3 small text-muted'>
                                            {pageType === 'login' ? 'Not a user..?' : 'Already a user..!'}{' '}
                                            <span className='text-primary' style={{ cursor: "pointer" }} onClick={togglePageType}>
                                                {pageType === 'login' ? 'click here to Signup' : 'click here to Login'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
            />
        </>
    )
}


const mapStateToProps = store => ({
    auth: store.auth,
    errors: store.errors
})

export default connect(mapStateToProps, { userLogin })(Login)