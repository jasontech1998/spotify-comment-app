import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ScrollToTop from '../hoc/ScrollToTop/ScrollToTop';
import Home from './Home/Home';
import Feed from './Feed/Feed';
import {getToken} from '../spotify';

class SpotifyApp extends Component {

  componentDidMount = () => {
    // if the url is empty, that means the getToken function hasn't been called yet (user not logged in)
    if (window.location.hash !== "") {
      // if user is logged in, call getToken function and grab access token from url, then delete the url to hide the access token
      const hash = getToken();
      window.location.hash = "";
      const token = hash.access_token;
  
      console.log("token: ", token)
      // don't run the above condition if user is not logged in
    } else {
      console.log("user is not logged in")
    }
  }
  render() {
    return (
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feed" exact component={Feed} />
          <Route render={() => <center><h1 id="error">404 Not Found</h1></center>} />
        </Switch>
      </ScrollToTop>
    );
  };
};

export default SpotifyApp;
