import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Navbar.css';
import Search from '../Search/Search';

class Navbar extends Component {

  onClickLogo = () => {
    this.props.history.push({
        pathname: "/",
        state: {
            token: this.props.token}
      });
  }
  render() {
    return (
        <div className="Navbar"> 
            <div className="Navbar"> 
                <nav className="navbar sticky-top navbar-expand-lg" id="navbar">
                    <div className="appLogo" onClick={() => this.onClickLogo()}>
                        <i className="fab fa-spotify fa-2x" id="logo"></i>
                        <span className="navbar-brand mb-0 h1" id="navbarName">PodSpot</span>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Search token={this.props.token}/>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
  }
}

export default withRouter(Navbar);