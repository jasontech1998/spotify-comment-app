import React, {Component} from 'react';

class Episode extends Component {
  render() {
    console.log(this.props.data)
    const episode = this.props.data;
    return (
      <div>
        <h1>Episode Name: {episode.name}</h1>
        <img 
          src={episode.images[0].url} 
          style={{width: "100px", height: "100px"}}/>
        <p>Description: {episode.description}</p>
        <p>Release Date: {episode.release_date}</p>
      </div>
    )
  }
}

export default Episode;