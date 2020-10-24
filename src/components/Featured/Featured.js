import React, { Component } from 'react';

import './Featured.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';


class Featured extends Component {
    state = {
        clicked: false
    }

    clickMemberHandler = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        let featureCards = (
            <center>
                <i class="fas fa-chevron-down" id="arrow" onClick={this.clickMemberHandler}></i>
            </center>
        );
        if (this.state.clicked) {
            featureCards = (
                <Auxiliary>
                    <center>
                        <i class="fas fa-chevron-up" id="arrow" onClick={this.clickMemberHandler}></i>
                    </center>
                    <div className="featureWrapper">
                        <div className="featuredEp">
                            <h1>this is a featured ep</h1>
                        </div>
                        <div className="featuredEp">
                            <h1>this is a featured ep</h1>
                        </div>
                        <div className="featuredEp">
                            <h1>this is a featured ep</h1>
                        </div>
                    </div>
                </Auxiliary>
            );
        }

        return (
        <div className="Featured">
            <center>
               <button className="featureHeading" onClick={this.clickMemberHandler}>Featured Episodes</button> 
            </center>
            {featureCards}
        </div>
        );
    }
}

export default Featured;