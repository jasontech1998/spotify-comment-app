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
            <button id="thumbup" onClick={this.likeHandler}>
                <i className="fas fa-thumbs-up"></i>
            </button>
        )
        
        if (this.state.ratings.ratedUsers && this.state.ratings.ratedUsers.includes(this.props.userId)) {
            showButton = (
                <button id="thumbup" onClick={this.likeHandler}>
                    <i className="fas fa-thumbs-up" id="likedThumb"></i>
                </button>
            )
        }
        
        return (
            <div className="Rate">
                {showButton}
                <h5>Likes: {this.state.likes}</h5>
            </div>
    );
  }
}

export default Rate;