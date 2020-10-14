import React, { Component } from 'react';

import './Navbar.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
        <div className="Navbar"> 
            <div className="Navbar"> 
                <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" id="navbar">
                    <i className="fab fa-spotify" id="logo"></i>
                    <span className="navbar-brand mb-0 h1" id="navbarName">Spotify-App</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to='/'><button type="button" className="btn btn-success" id="logoutBtn">Logout</button></NavLink>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
    </div>
    );
  }
}

export default Navbar;