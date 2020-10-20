import React, { Component } from 'react';

import './Rate.css';
import axios from '../../axios-instance';


class Rate extends Component {
    state= {
        likes: null,
        dislikes: null
    }

    likeHandler = () => {
        console.log("like");
        const likes = this.state.likes + 1
        axios.put("/episodes/"+ this.props.episodeId +"/rating/likes.json", likes);
    }

    dislikeHandler = () => {
        console.log("dislike");
        const dislikes = this.state.likes + 1
        axios.put("/episodes/"+ this.props.episodeId +"/rating/dislikes.json", dislikes);
    }

    render() {
        axios.get("/episodes/"+ this.props.episodeId +"/rating/likes.json").then(response => {
            const thumb = response.data;
            this.setState({likes: thumb})
            
        })
        axios.get("/episodes/"+ this.props.episodeId +"/rating/dislikes.json").then(response => {
            const thumb = response.data;
            this.setState({dislikes: thumb})
            
        })
        return (
            <div className="Rate">
                <button id="thumbup" onClick={this.likeHandler}><i class="fas fa-thumbs-up"></i></button>
                <h5>Likes: {this.state.likes}</h5>
                <button id="thumbdown" onClick={this.dislikeHandler}><i class="fas fa-thumbs-down"></i></button>
                <h5>Disikes: {this.state.dislikes}</h5>
            </div>
    );
  }
}

export default Rate;