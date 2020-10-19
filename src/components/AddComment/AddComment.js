import React, { Component } from 'react';

import './AddComment.css';

class AddComment extends Component {
    state = {
        comment: null,
        time: null,
        episodeId: null
    }

    onChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    AddCommentHandler = () => {
        console.log("Added");
        // Set state of time and episodeid to prop values
        // Add time, comment, and episodeId to firebase
        // Clear the comment state value
    }
  
    render() {
    return (
      <div className="AddComment">
            <h2 id="commentHeader">Add a Comment!</h2>
            <hr id="ruler"></hr>
            <div id="commentTime">
                <h3 id="timeChoice">3:04</h3>
                <textarea 
                    className="form-control" 
                    onChange={(event) => this.onChangeHandler(event)} 
                    name="comment"
                    value={this.state.comment}  
                    id="exampleFormControlTextarea1" 
                    rows="3" 
                    maxLength="150"
                    placeholder="What are your thoughts?">
                </textarea>
            </div>
            <button type="button" className="btn btn-light" id="addCommentBtn" onClick={this.AddCommentHandler}> COMMENT </button>
      </div>
    );
  }
}

export default AddComment;