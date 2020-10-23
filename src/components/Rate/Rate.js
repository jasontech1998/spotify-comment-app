import React, { Component } from 'react';

import './Rate.css';
import axios from '../../axios-instance';



class Rate extends Component {
    state= {
        likes: null,
        ratings: {
            likes: null,
            ratedUsers: null
        }
    }

    componentDidMount = () => {
        console.log('rate has mounted')
        axios.get("/episodes/"+ this.props.episodeId +"/rating.json").then(response => {
            this.setState({
                ratings: response.data,
                likes: response.data.likes,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidUpdate = (prevProps) => {
        // if different props, user clicked on new episode so update ratings
        if (this.props.episodeId !== prevProps.episodeId) {
            axios.get("/episodes/"+ this.props.episodeId +"/rating.json").then(response => {
                if (response.data === null) {
                    console.log('not rated yet')
                    this.setState({
                        likes: 0,
                        ratings: {
                            likes: 0,
                            ratedUsers: null
                        }
                    })
                } else {
                    console.log('has been rated')
                    this.setState({
                        ratings: response.data,
                        likes: response.data.likes,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    likeHandler = () => {
        let ratings = null;
        let ratedUsers = undefined;
        if (this.state.ratings.ratedUsers) {
            ratedUsers = this.state.ratings.ratedUsers;
        }
        let updateLikes = this.state.likes;
        // if ratedUser's includes current user, decrement like and remove userId from ratedUser
        if (ratedUsers && ratedUsers.includes(this.props.userId)) {
            updateLikes = updateLikes - 1;
            const userIndex = ratedUsers.indexOf(this.props.userId);
            ratedUsers.splice(userIndex, 1);
            ratings = {
                likes: updateLikes,
                ratedUsers: ratedUsers
            }
        }
        // if ratedUsers but doesn't include current user, push userId in and increment like
        else if (ratedUsers) {
            ratedUsers.push(this.props.userId);
            updateLikes = updateLikes + 1;
            // update ratings in firebase
            ratings = {
                likes: updateLikes,
                ratedUsers: ratedUsers
            }
        }
        
        // if there are no ratedUsers, no one has liked or disliked yet, so create new array and add userId in
        else if (ratedUsers === undefined) {
            ratedUsers = new Array(this.props.userId);
            updateLikes = updateLikes + 1;
            ratings = {
                likes: updateLikes,
                ratedUsers: ratedUsers
            }
        } 
        axios.put("/episodes/"+ this.props.episodeId +"/rating.json", ratings);
        this.setState({
            likes: updateLikes,
            ratings: ratings
            });
    }


    render() {
        let showButton = (
            <div id="thumbup" onClick={this.likeHandler}>
                    <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.2083 21.7393C2.3375 21.7393 0 24.1784 0 27.174V44.5654C0 47.561 2.3375 50.0001 5.2083 50.0001H11.4583C12.6312 50.0001 13.7104 49.5871 14.5833 48.9001V21.7393H5.2083Z" fill="#868895"/>
<path d="M49.9998 29.8913C49.9998 28.5848 49.504 27.3674 48.6436 26.4695C49.6165 25.3587 50.1123 23.8695 49.9769 22.3196C49.7331 19.5565 47.3477 17.3913 44.5436 17.3913H31.6748C32.3123 15.3717 33.3331 11.6695 33.3331 8.69563C33.3331 3.98041 29.4936 0 27.0831 0C24.9186 0 23.3727 1.27174 23.3061 1.32391C23.0603 1.53047 22.9165 1.84351 22.9165 2.17388V9.5456L16.9165 23.1087L16.6665 23.2413V46.5413C18.3623 47.3761 20.5081 47.8261 21.8748 47.8261H40.9978C43.2665 47.8261 45.252 46.2304 45.7186 44.0283C45.9581 42.8957 45.8186 41.7544 45.3415 40.7631C46.8811 39.9544 47.9165 38.3 47.9165 36.4131C47.9165 35.6435 47.7478 34.9065 47.427 34.2392C48.9665 33.4305 49.9998 31.7761 49.9998 29.8913Z" fill="#868895"/>
</svg>
                <span className="tooltipText">I like this episode</span>
            </div>
        )
        
        if (this.state.ratings.ratedUsers && this.state.ratings.ratedUsers.includes(this.props.userId)) {
            showButton = (
                <div id="thumbup" onClick={this.likeHandler}>
                   <svg width="20" height="20" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.72913 27.7783C2.57125 27.7783 0 30.1278 0 33.0133V49.7652C0 52.6507 2.57125 55.0002 5.72913 55.0002H12.6041C13.8944 55.0002 15.0814 54.6024 16.0416 53.9406V27.7783H5.72913Z" fill="#8CC284"/>
                <path d="M55.0007 35.6308C55.0007 34.3723 54.4553 33.1996 53.5088 32.3348C54.5791 31.2648 55.1244 29.8303 54.9755 28.3374C54.7073 25.6759 52.0833 23.5903 48.9988 23.5903H34.8431C35.5444 21.6449 36.6673 18.0789 36.6673 15.2143C36.6673 10.6724 32.4438 6.83838 29.7923 6.83838C27.4113 6.83838 25.7108 8.06336 25.6375 8.11362C25.3671 8.31258 25.209 8.61412 25.209 8.93234V16.033L18.609 29.0975L18.334 29.2252V51.6686C20.1994 52.4727 22.5598 52.9062 24.0631 52.9062H45.0984C47.594 52.9062 49.778 51.3692 50.2913 49.248C50.5548 48.157 50.4013 47.0577 49.8766 46.1028C51.5701 45.3238 52.7091 43.7303 52.7091 41.9127C52.7091 41.1715 52.5234 40.4616 52.1706 39.8188C53.8641 39.0398 55.0007 37.4462 55.0007 35.6308Z" fill="#8CC284"/>
                <path d="M42.3777 8.8501H39.1487C38.2564 8.8501 37.5342 9.5099 37.5342 10.3254C37.5342 11.1408 38.2563 11.8007 39.1487 11.8007H42.3777C43.2701 11.8007 43.9923 11.1409 43.9923 10.3254C43.9922 9.5099 43.2701 8.8501 42.3777 8.8501Z" fill="#8CC284"/>
                <path d="M26.063 3.76516L24.4486 0.814696C24.0466 0.085693 23.08 -0.206713 22.2822 0.154893C21.4844 0.519345 21.1611 1.4054 21.5601 2.1344L23.1747 5.08486C23.573 5.81092 24.5379 6.10922 25.3411 5.74467C26.1387 5.38021 26.4619 4.49416 26.063 3.76516Z" fill="#8CC284"/>
                <path d="M36.6422 0.154876C35.8475 -0.206731 34.8748 0.0857738 34.4758 0.814681L32.8613 3.76515C32.4624 4.49416 32.7857 5.38012 33.5834 5.74467C34.3889 6.1102 35.3526 5.80847 35.7498 5.08486L37.3643 2.13439C37.7632 1.40538 37.4399 0.519329 36.6422 0.154876Z" fill="#8CC284"/>
                <path d="M19.7752 8.8501H16.5462C15.6538 8.8501 14.9316 9.5099 14.9316 10.3254C14.9316 11.1408 15.6537 11.8007 16.5462 11.8007H19.7752C20.6675 11.8007 21.3897 11.1409 21.3897 10.3254C21.3897 9.5099 20.6675 8.8501 19.7752 8.8501Z" fill="#8CC284"/>
                </svg>
                <span className="tooltipText">Remove like</span>
                </div>
            )
        }
        
        return (
            <div className="Rate">
                <span style={{marginRight: "8px", color: "rgb(134, 136, 149)"}}>{this.state.likes}</span>
                {showButton}
            </div>
    );
  }
}

export default Rate;