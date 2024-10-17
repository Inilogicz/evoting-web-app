import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faVoteYea, faSignOutAlt, faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, handleVoteClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Voting App</h1>
            </div>
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li>
                    <NavLink to="/" activeclassname="active">
                        <FontAwesomeIcon icon={faHome} /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/results" activeclassname="active">
                        <FontAwesomeIcon icon={faChartBar} /> Results
                    </NavLink>
                </li>
                <li>
                    <button className="vote-button" onClick={handleVoteClick}>
                        <FontAwesomeIcon icon={faVoteYea} /> Vote
                    </button>
                </li>
                {isAuthenticated ? (
                    <li>
                        <button className="logout-button" onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/login" className="login-button" activeclassname="active">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
