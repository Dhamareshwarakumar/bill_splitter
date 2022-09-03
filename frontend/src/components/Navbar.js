import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


const Navbar = props => {
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState('/')

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const isActive = page => {
        return page === currentPage ? 'active' : '';
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link className='navbar-brand' to='/'>
                    <img src="/img/logo.png" alt="Bill Splitter" height="40px" />{" "}
                    Bill Splitter
                </Link>
                <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls='navbar-content' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/')}`} to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/status')}`} to='/status'>Status</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/activity')}`} to='/activity'>Activity</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        {props.auth.isAuthenticated ? (
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.auth.user.name} <i className="bi bi-person-fill"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                            </li>
                        ) : (
                            <li className='nav-item'>
                                <Link className="btn btn-outline-success" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}


const mapStateToProps = store => ({
    auth: store.auth
});

export default connect(mapStateToProps, null)(Navbar)