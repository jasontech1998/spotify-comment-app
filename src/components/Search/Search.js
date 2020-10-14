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
    this.props.history.push({
      pathname: "/feed",
      state: {
          searchInput: this.state.searchInput,
          token: this.props.token}
    });
    
  }

  render () {
    return (
      <div className="container">
        <form className="example" 
          onSubmit={(e) => this.onSubmitSearchHandler(e)}>
          <input 
            onChange={(e) => this.onSearchHandler(e)}
            type="text" placeholder="Search.." name="search"></input>
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    )
  }
}

export default withRouter(Search);