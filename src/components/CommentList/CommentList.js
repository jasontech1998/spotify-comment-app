import React, { Component } from 'react';

import './CommentList.css';
import axios from '../../axios-instance';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

class CommentList extends Component {
    state = {
        comments: []
    }
  
    render() {
        // Retrive comments from firebase
        const queryParams = '?orderBy="episodeId"&equalTo="' + this.props.episodeId + '"';
        axios.get('/comments.json' + queryParams).then(response => {
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
                    return (
                        <div className="singleComment" key= {comments + index} id={comments.episodeId}>
                            <button id="goToTimeBtn"><h4>TimeStamp: {comments.time}</h4></button>
                            <hr id="commentRule"></hr>
                            <h5>{comments.comment}</h5>
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