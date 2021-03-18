
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleEngineChange = this.handleEngineChange.bind(this);
    }

    search() {
      this.props.onSearch();
    }
    
    handleTermChange(event) {
      this.props.onTermChange(event.target.value);
    }
    
    handleEngineChange(event) {
      this.props.onEngineChange(event.target.value);
    }

    render() {
      return (
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
          <select name='Engine' id='Engine' onChange={this.handleEngineChange}>
            <option value='' selected class='s'>Select Search Engine</option>
            <option value='Deezer'> Deezer </option>
            <option value='Spotify'> Spotify </option>
          </select>
          <button className="SearchButton" onClick={this.search}>SEARCH</button>
        </div>
      );
    }
}

export default SearchBar;