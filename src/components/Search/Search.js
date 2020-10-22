import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './Search.css';


class Search extends Component {
  state = {
    searchInput: ""
  }

  onSearchHandler = (e) => {
    this.setState({searchInput: e.target.value})
  }

  onSubmitSearchHandler = (e) => {
    e.preventDefault();
    if (this.state.searchInput === "") {
      console.log('no input')
    } else {
      this.setState({searchInput: ""});
      this.props.history.push({
        pathname: "/searchResults",
        state: {
            searchInput: this.state.searchInput,
            token: this.props.token}
      });
    }
  }

  render () {
    let placeholderValue = "What's your favorite podcast?"
    // change placeholder if one searchResults or episodesList
    if (this.props.history.location.pathname === "/searchResults" || this.props.history.location.pathname === "/episodesList") {
      placeholderValue = "Search";
    }
    return (
      <div className="searchContainer">
        <form className="search" 
          onSubmit={(e) => this.onSubmitSearchHandler(e)}>
          <button type="submit"><i className="fa fa-search"></i></button>
          <input 
            onChange={(e) => this.onSearchHandler(e)}
            type="text" 
            name="search"
            placeholder={placeholderValue}
            value={this.state.searchInput}></input>
        </form>
      </div>
    )
  }
}

export default withRouter(Search);