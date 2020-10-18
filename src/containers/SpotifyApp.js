import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ScrollToTop from '../hoc/ScrollToTop/ScrollToTop';
import './SpotifyApp.css';
import Home from './Home/Home';
import SearchResults from './SearchResults/searchResults';
import EpisodesList from './EpisodesList/EpisodesList';
import {getToken} from '../spotify';

class SpotifyApp extends Component {
  state = {
    token: null
  }
  componentDidMount = () => {
    // if the url is empty, that means the getToken function hasn't been called yet (user not logged in)
    if (window.location.hash !== "") {
      // if user is logged in, call getToken function and grab access token from url, then delete the url to hide the access token
      const hash = getToken();
      window.location.hash = "";
      const token = hash.access_token;
      this.setState({token: token})
      // don't run the above condition if user is not logged in
    } else {
      console.log("user is not logged in")
    }
  }
  render() {
    return (
      <ScrollToTop>
        <Switch>
          <Route path="/" exact render={() => (
            <Home token={this.state.token}/>
          )}/>
          <Route path="/searchResults" exact component={SearchResults} />
          <Route path="/episodesList" exact component={EpisodesList} />
          <Route render={() => <center><h1 id="error">404 Not Found</h1></center>} />
        </Switch>
      </ScrollToTop>
    );
  };
};

export default SpotifyApp;
