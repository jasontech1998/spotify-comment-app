import React, { Component } from 'react';

import './AddComment.css';
import axios from '../../axios-instance';

class AddComment extends Component {
    state = {
        comment: ""
    }

    componentDidMount = () => {
      this.setState({
        time: this.props.time,
        episodeId: this.props.episodeId
      })
    }

    onChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    // Converts millisecond to minutes
    millisecondsToMinutesConverter = (millis) => {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    AddCommentHandler = () => {
        //Only add comment if theres a comment
        if(this.state.comment !== "") {
          //Grab time value
          let currentTime = this.millisecondsToMinutesConverter(this.props.time);
          // Add time, comment, and episodeId to firebase
          const comment = {
            episodeId: this.props.episodeId,
            time: currentTime,
            comment: this.state.comment
          }
          axios.post('/comments.json', comment);
          // Clear the comment state value
          this.setState({comment: ""})
        } else {
          alert("Please add a comment before posting!");
        }
        
    }
  
    render() {
    let timeChoice = null;
    let currentTime = this.millisecondsToMinutesConverter(this.props.time);
    timeChoice = <h3 id="timeChoice">TimeStamp: {currentTime}</h3>
    return (
      <div className="AddComment">
            <h2 id="commentHeader">Add a Comment!</h2>
            <hr id="ruler"></hr>
            <div id="commentTime">
                {timeChoice}
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