import React, {Component} from 'react';


class Episode extends Component {

  state = {
    isConnected: false
  }

  setUpPlayer = () => {
    // if the Spotify SDK has loaded
    if (window.Spotify) {
      console.log('loaded')
      const token = this.props.token;
      // create a new player
      this.player = new window.Spotify.Player({
        name: "Spotify Comment App",
        getOAuthToken: cb => { cb(token); },
      });
      
      // set up the player's event handlers
      this.setPlayerTrack();
      
      // finally, connect!
      this.player.connect();
    }
  }

  setPlayerTrack = () => {
    const uri = this.props.data.uri;
    this.player.addListener('ready', ({ device_id }) => {
      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };

      play({
        playerInstance: this.player,
        spotify_uri: uri,
      });
    });
  }
  

  render() {
    const episode = this.props.data;
    // console.log(episode)
        if (this.props.token && !this.state.isConnected) {
          
          this.setUpPlayer();
        }
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