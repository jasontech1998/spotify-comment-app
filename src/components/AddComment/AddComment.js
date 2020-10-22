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
          // Add time, comment, and episodeId to firebase
          const comment = {
            episodeId: this.props.episodeId,
            time: this.props.time,
            comment: this.state.comment,
            userName: this.props.userName,
            date: new Date()
          }
          axios.post("/episodes/"+ this.props.episodeId +"/comments.json", comment);
          // Clear the comment state value
          this.setState({comment: ""})
        } else {
          alert("Please add a comment before posting!");
        }
        
    }
  
    render() {
    let timeChoice = null;
    let currentTime = this.millisecondsToMinutesConverter(this.props.time);
    timeChoice = <h3 id="timeChoice">{currentTime}</h3>
    return (
      <div className="AddComment">
            <div id="commentTime">
                <div className="playTimeWrapper">
                  {this.props.playButton}
                  {timeChoice}
                </div>
                <textarea 
                    className="form-control"
                    id="commentForm"
                    onChange={(event) => this.onChangeHandler(event)} 
                    name="comment"
                    value={this.state.comment}  
                    rows="2" 
                    maxLength="300"
                    placeholder="What are your thoughts?">
                </textarea>
            </div>
            <button type="button" className="btn btn-light" id="addCommentBtn" onClick={this.AddCommentHandler}> COMMENT </button>
      </div>
    );
  }
}

export default AddComment;