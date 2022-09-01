import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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
                        <li className='nav-item'>
                            <button class="btn btn-outline-success" type="submit">Login</button>
                        </li>
                        <li className="nav-item dropdown me-3">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dhamaresh <i class="bi bi-person-fill"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><Link class="dropdown-item" to="/logout">Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar