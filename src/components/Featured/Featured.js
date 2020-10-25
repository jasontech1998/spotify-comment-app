import React, { Component } from 'react';

import './Featured.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { withRouter } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
const spotify = new SpotifyWebApi();

class Featured extends Component {

    state = {
        clicked: false,
        episodesData: null
    }

    componentDidMount = () => {
        if (this.props.token) {
            // to change featured episode, change the episode ids in this array
            const episodesArray = ["0OrHFgKhoainuuJ9CBrw37", "0IauvmuNWLf7msd6iAaxxQ", "3rgnN5bxPE5u80gLr54TlW"];
            spotify.setAccessToken(this.props.token);
            spotify.getEpisodes(episodesArray)
                .then(data => {
                    this.setState({episodesData: data})
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    clickMemberHandler = () => {
        this.setState({
            clicked: !this.state.clicked}
            , () => this.updateMaxHeight())
    }

    updateMaxHeight = () => {
        if (this.state.clicked) {
            let featureWrapper = document.querySelector(".featureWrapper");
            featureWrapper.style.maxHeight = "800px";
            let chevron = document.getElementById("arrow");
            chevron.style.transform = "rotate(180deg)";
        } else {
            let featureWrapper = document.querySelector(".featureWrapper");
            featureWrapper.style.maxHeight = "0";
            let chevron = document.getElementById("arrow");
            chevron.style.transform = "rotate(0)";
        }
    }
    // Converts millisecond to minutes
    millisecondsToMinutesConverter = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    onClickEpisodeHandler = (episode) => {
        console.log(episode.show.id);
        spotify.getShowEpisodes(episode.show.id, {limit: 50})
            .then(episodes => {
                console.log(episodes)
                this.props.history.push({
                    pathname: "/episodesList",
                    state: {
                        token: this.props.token,
                        featureEpisode: episode,
                        episodesResult: episodes.items
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
        
    }


    render() {
        let showFeatures = null;
        if (this.state.episodesData) {
            const { episodesData } = this.state;
            showFeatures = (
                <Auxiliary>
                    {episodesData.episodes.map((episode) => {
                        let durationTime = this.millisecondsToMinutesConverter(episode.duration_ms);
                        // if description is over 200 chars, trim it
                        const length = 153;
                        let trimDescription = 
                          episode.description.length > length ?
                          episode.description.substring(0, length) + "..." :
                          episode.description;
                        return (
                            <div
                            onClick={() => this.onClickEpisodeHandler(episode)}  
                                className="episodeWrapper"
                                key={episode.id}>
                                <div className="imageWrapper">
                                <img
                                    id="episodeImage"
                                    alt="episodesImage" 
                                    src={episode.images[0].url}/>
                                </div>
                                <div className="episodeDataWrapper">
                                <div className="aboutEpisodeWrapper">
                                    <div>
                                    <h3 className="episodeListName">
                                        {episode.name}
                                    </h3>   
                                    <span className="episodeMinutes">{durationTime}</span>
                                    </div>
                                    <div className="aboutEpisodeWrapper2">
                                    <span className="aboutEp">About this Episode</span>
                                    <span className="epDescription">{trimDescription}</span>
                                    </div>
                                </div>
                                <div className="episodeDate">
                                    <span className="episodeMinutes" style={{fontSize: "16px"}}>{episode.release_date}</span>
                                </div>
                                <div className="episodesRight">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </Auxiliary>
            )
        }
        return (
        <div className="Featured">
            <div className="teamTitle" onClick={this.clickMemberHandler}>
                <button className="featureHeading">Featured Episodes</button> 
                <i className="fas fa-chevron-down" id="arrow" onClick={this.clickMemberHandler}></i>
            </div>
            <div className="featureWrapper">
                {showFeatures}
            </div>
        </div>
        );
    }
}

export default withRouter(Featured);