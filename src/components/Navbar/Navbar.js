import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Navbar.css';
import Search from '../Search/Search';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

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
        <Auxiliary>
            <div className="Navbar"> 
                <div className="appLogo" onClick={() => this.onClickLogo()}>
                    <i className="fab fa-spotify fa-2x" id="logo"></i>
                    <h1 id="navbarName">PodSpot</h1>
                </div>
                <Search token={this.props.token}/>
            </div>
        </Auxiliary>
        
    );
  }
}

export default withRouter(Navbar);