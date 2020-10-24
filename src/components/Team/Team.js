import React, { Component } from 'react';

import './Team.css';
import shaun from '../Images/shaun.jpg';
import jason from '../Images/jason.jpg';
import johnny from '../Images/johnny.jpg';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';


class Team extends Component {
    state = {
        clicked: false
    }

    clickMemberHandler = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        let memberCards = (
            <center>
                <i class="fas fa-chevron-down" id="arrow" onClick={this.clickMemberHandler}></i>
            </center>
        );
        if (this.state.clicked) {
            memberCards = (
                <Auxiliary>
                    <center>
                        <i class="fas fa-chevron-up" id="arrow" onClick={this.clickMemberHandler}></i>
                    </center>
                    <div className="teamWrapper">
                        <div className="member">
                            <img src={shaun} alt="" id="profilePic"></img>
                            <span id="memberName">Shaun Tan</span>
                            <span id="memberTitle">UX Designer</span>
                            <a href="https://www.linkedin.com/in/shaun-tan-0b1a5713a/" id="memberLink" target="_blank">LinkedIn</a>
                            <a href="https://tanshaun.com/work" id="memberLink" target="_blank">Portfolio</a>
                        </div>
                        <div className="member">
                            <img src={jason} alt="" id="profilePic"></img>
                            <span id="memberName">Jason Yu</span>
                            <span id="memberTitle">Software Engineer</span>
                            <a href="https://www.linkedin.com/in/jasonyu529/" id="memberLink" target="_blank">LinkedIn</a>
                            <a href="https://jasontech1998.github.io/portfolio/" id="memberLink" target="_blank">Portfolio</a>
                        </div>
                        <div className="member">
                            <img src={johnny} alt="" id="profilePic"></img>
                            <span id="memberName">Johnny Nguyen</span>
                            <span id="memberTitle">Front End Developer</span>
                            <a href="https://www.linkedin.com/in/johnny-nguyen-tech/" id="memberLink" target="_blank">LinkedIn</a>
                            <a href="https://johnnynguyentech.github.io/" id="memberLink" target="_blank">Portfolio</a>
                        </div>
                    </div>
                </Auxiliary>
            );
        }

        return (
        <div className="Team">
            <center>
               <button className="teamHeading" onClick={this.clickMemberHandler}>About the PodSpot Team</button> 
            </center>
            {memberCards}
        </div>
        );
    }
}

export default Team;