import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Redirect } from 'react-router-dom';
import './Search.css';

const spotify = new SpotifyWebApi();

class Search extends Component {

  render () {
    if (this.props.token) {
      // gives spotify api user's access token
      spotify.setAccessToken(this.props.token);

      // this will get joe rogan's profile and inside the data u can see all of his shows
      spotify.getShow("4rOoJ6Egrf8K2IrywzwOMk").then(
        function (data) {
          console.log('Artist information', data);
        },
        function (err) {
          console.error(err);
        }
      );
    }
    return (
      <div className="container">
        <form className="example">
          <input type="text" placeholder="Search.." name="search"></input>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    )
  }
}

export default Search;