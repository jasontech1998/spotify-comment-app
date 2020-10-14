import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class EpisodesList extends Component {
  render () {
    let showEpisodes = null;
  
    if (this.props.episodes) {
      showEpisodes = (
        <Auxiliary>
          {this.props.episodes.map((episode) => {
            return (
              <div key={episode.id}>
                <h3>Episode Name: {episode.name}</h3>
                <img src={episode.images[0].url} style={{width: "100px", height: "100px"}}/>
              </div>
            )
          })}
        </Auxiliary>
      )
    }
    return (
      <div>
        {showEpisodes}
      </div>
    )
  }
}

export default EpisodesList;