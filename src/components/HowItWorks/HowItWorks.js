import React, { Component } from 'react';

import './HowItWorks.css';



class HowItWorks extends Component {
    state = {
        clicked: false
    }

    clickHowHandler = () => {
        this.setState({
            clicked: !this.state.clicked}
            , () => this.updateMaxHeight())
    }

    updateMaxHeight = () => {
        if (this.state.clicked) {
            let teamWrapper = document.querySelector(".HowItWorksWrapper");
            teamWrapper.style.maxHeight = "800px";
            let chevron = document.getElementById("arrow3");
            chevron.style.transform = "rotate(180deg)";
        } else {
            let teamWrapper = document.querySelector(".HowItWorksWrapper");
            teamWrapper.style.maxHeight = "0";
            let chevron = document.getElementById("arrow3");
            chevron.style.transform = "rotate(0)";
        }
    }

    render() {
        return (
        <div className="HowItWorks">
            <div className="HowItWorksTitle" onClick={this.clickHowHandler}>
                <button className="HowItWorksHeading">How Podspot Works</button> 
                <i className="fas fa-chevron-down" id="arrow3" onClick={this.clickHowHandler}></i>
            </div>
            <div className="HowItWorksWrapper">
                <div className="HowItWorksContent">
                    <h1>this is how it works</h1>
                </div>
            </div>
        </div>
        );
    }
}

export default HowItWorks;