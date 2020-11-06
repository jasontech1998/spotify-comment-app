import React, { Component } from 'react';

import './Team.css';
import shaun from '../Images/shaun.jpg';
import jason from '../Images/jason.jpg';
import johnny from '../Images/johnny.jpg';



class Team extends Component {
    state = {
        clicked: false
    }

    clickMemberHandler = () => {
        this.setState({
            clicked: !this.state.clicked}
            , () => this.updateMaxHeight())
    }

    updateMaxHeight = () => {
        if (this.state.clicked) {
            let teamWrapper = document.querySelector(".teamWrapper");
            teamWrapper.style.maxHeight = "1500px";
            let chevron = document.getElementById("arrow2");
            chevron.style.transform = "rotate(180deg)";
        } else {
            let teamWrapper = document.querySelector(".teamWrapper");
            teamWrapper.style.maxHeight = "0";
            let chevron = document.getElementById("arrow2");
            chevron.style.transform = "rotate(0)";
        }
    }

    render() {
        return (
        <div className="Team">
            <div className="teamTitle" onClick={this.clickMemberHandler}>
                <button className="teamHeading">About the PodSpot Team</button> 
                <i className="fas fa-chevron-down" id="arrow2" onClick={this.clickMemberHandler}></i>
            </div>
            <div className="teamWrapper">
                <div className="member">
                    <img src={shaun} alt="" id="profilePic"></img>
                    <span id="memberName">Shaun Tan</span>
                    <span id="memberTitle">UX Designer</span>
                    <a href="https://www.linkedin.com/in/shaun-tan-0b1a5713a/" id="memberLink" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://tanshaun.com/work" id="memberLink" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </div>
                <div className="member">
                    <img src={jason} alt="" id="profilePic"></img>
                    <span id="memberName">Jason Yu</span>
                    <span id="memberTitle">Software Developer</span>
                    <a href="https://www.linkedin.com/in/jasonyu529/" id="memberLink" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://jasontech1998.github.io/portfolio/" id="memberLink" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </div>
                <div className="member">
                    <img src={johnny} alt="" id="profilePic"></img>
                    <span id="memberName">Johnny Nguyen</span>
                    <span id="memberTitle">Front End Developer</span>
                    <a href="https://www.linkedin.com/in/johnny-nguyen-tech/" id="memberLink" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://johnnynguyentech.github.io/" id="memberLink" target="_blank" rel="noopener noreferrer">Portfolio</a>
                </div>
            </div>
        </div>
        );
    }
}

export default Team;