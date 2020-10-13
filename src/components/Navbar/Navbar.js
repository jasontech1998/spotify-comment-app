import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {

  render() {
    return (
        <div className="Navbar"> 
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light" id="navbar">
            <i class="fab fa-spotify"></i>
            <span className="navbar-brand mb-0 h1" id="navbarName">Spotify-App</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    <li>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-success" id="logoutBtn">Logout</button>
                    </li>
                    </ul>
                </div>
        </nav>
    </div>
    );
  }
}

export default Navbar;