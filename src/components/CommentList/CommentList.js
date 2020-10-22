import React, { Component } from 'react';

import './CommentList.css';
import axios from '../../axios-instance';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

class CommentList extends Component {
    state = {
        comments: []
    }

    // Converts millisecond to minutes
    millisecondsToMinutesConverter = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  
    render() {
        // Retrive comments from firebase
        axios.get("/episodes/" + this.props.episodeId + "/comments.json").then(response => {
            const results = [];
            for (let key in response.data) {
                results.unshift({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({comments: results})
        })
        //Display Firebase data in cards
        let commentList = (
            <Auxiliary>
                {this.state.comments.map((comments, index) => {
                    let commentTime = this.millisecondsToMinutesConverter(comments.time);
                    return (
                        <div className="singleComment" key= {comments + index} id={comments.episodeId}>
                            <div className="commentHeadingWrapper">
                                <div className="nameTimeWrapper">
                                    <h5 id="commenter">{comments.userName} </h5>
                                    <h5 id="darkerColor"> at </h5>
                                    <button 
                                        onClick={() => this.props.onClick(comments.time)}
                                        id="goToTimeBtn"><h5>{commentTime}</h5>
                                    </button>
                                </div>
                                <h5 id="darkerColor">## Days Ago</h5>
                            </div>
                            <div id="commenter">
                                <h5>{comments.comment}</h5>
                            </div>
                        </div>  
                    );
                })}
            </Auxiliary>
        );
    return (
        <div className="CommentList">
            {commentList}
        </div>
    );
  }
}

export default CommentList;