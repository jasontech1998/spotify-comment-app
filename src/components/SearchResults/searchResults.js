import React, {Component} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

class SearchResults extends Component {
  render () {
    let showResults = null;
    if (this.props.searchResults) {
      showResults = (
        <Auxiliary>
         {this.props.searchResults.map((show) => {
          //  console.log(show)
           return (
             <div key={show.id}>
               <h3>Show Name: {show.name}</h3>
               <img src={show.images[0].url}/>
             </div>
           )
         })} 
        </Auxiliary>
      )
    }
    return (
      <div>
        <h1>Search Results</h1>
        {showResults}
      </div>
    )
  }
}

export default SearchResults;