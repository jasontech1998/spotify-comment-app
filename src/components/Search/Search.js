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
          <button type="submit" className="searchBtnWrapper">
            <svg style={{marginBottom: "10px"}}className="searchSvg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4688 14.5688L11.7875 10.8875C12.7 9.775 13.25 8.35 13.25 6.79688C13.25 3.23438 10.3594 0.34375 6.79688 0.34375C3.23125 0.34375 0.34375 3.23438 0.34375 6.79688C0.34375 10.3594 3.23125 13.25 6.79688 13.25C8.35 13.25 9.77187 12.7031 10.8844 11.7906L14.5656 15.4688C14.8156 15.7188 15.2188 15.7188 15.4688 15.4688C15.7188 15.2219 15.7188 14.8156 15.4688 14.5688ZM6.79688 11.9656C3.94375 11.9656 1.625 9.64687 1.625 6.79688C1.625 3.94688 3.94375 1.625 6.79688 1.625C9.64687 1.625 11.9688 3.94688 11.9688 6.79688C11.9688 9.64687 9.64687 11.9656 6.79688 11.9656Z" fill="#868895"/>
            </svg>
          </button>
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