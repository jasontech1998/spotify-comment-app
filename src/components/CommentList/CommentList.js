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
                            <button id="goToTimeBtn"><h4>TimeStamp: {commentTime}</h4></button>
                            <hr id="commentRule"></hr>
                            <div id="commenter">
                                <h5>{comments.userName}: {comments.comment}</h5>
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