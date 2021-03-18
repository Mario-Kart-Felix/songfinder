
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Deezer from "../../util/Deezer";
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSearchResults:0,
      nextSearchResultLink:null,
      searchResults:[],
      playlistName: 'My Favority Songs',
      playlistTracks:[],
      canSave:false,
      searchTerm: '',
      searchEngine:'',
    };
    
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.updateEngine = this.updateEngine.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    this.search = this.search.bind(this);
  }

  /* Add a song to the playlist */
  addTrack(track) {
    let newPlayList = this.state.playlistTracks.slice();
    
    const found = newPlayList.findIndex(savedTrack => savedTrack.id === track.id);
    if(found === -1 ) {
      /* new songs which is not in the playlist */
      newPlayList.push(track);
      this.setState({playlistTracks: newPlayList});
    }
  }
  
  /* Add a song to the playlist */
  removeTrack(track) {  
    console.log("remove track");
    const newPlayList = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newPlayList});
  }
  
  /* update the playlist name */
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  /* save the playlist to user account */
  savePlaylist() {
    
  }
 
  /* store the search input */
  updateTerm(term) {
       this.setState({
          searchTerm: term
        });
  }

   /* store the search Engine */
   updateEngine(engine) {
    this.setState({
       searchEngine: engine
     });
}

    /* get the playlist from Deezer */
  updatePlaylist(playList) {

    if(playList && playList.length >= 0) {
      this.setState({
        playlistTracks: playList
      });
    }
  }

  /* save the playlist to user account */
  updateSearchResults(jsonSearchResults) {
    const searchResults = jsonSearchResults;
    if(JSON.stringify(searchResults) === '{}') return;

    const totalSearchResults = searchResults.total;
    const nextSearchResultLink = searchResults.next;

    const newSearchResults = [];

    if(searchResults) {
      searchResults.data.forEach(item => {
        const newItem = {
          name: item.title_short,
          artist: item.artist.name,
          album: item.album.title,
          id: item.id,
          link: item.link,
        };
        newSearchResults.push(newItem);
      });
    }
    
    this.setState({
      totalSearchResults: totalSearchResults,
      nextSearchResultLink: nextSearchResultLink,
      searchResults: newSearchResults,
    });  
  }
  
  /* search the songs based on searchTerm */
  search() {
    const searchTerm = this.state.searchTerm;
    const searchEngine = this.state.searchEngine;

    if(searchEngine === 'Deezer') {
      Deezer.search(searchTerm,this.updateSearchResults);
      Deezer.retrivePlaylist(this.updatePlaylist);
    } else {
      /* search Engine is Spotify */
      Spotify.search(searchTerm,this.updateSearchResults);
      Spotify.retrivePlaylist(this.updatePlaylist);
    }

  }

  render() {
  
    return (
      <div>
        <h1>Song<span className="highlight">finder</span></h1>
        <div className="App">
          <SearchBar  onSearch={this.search}
                      onTermChange={this.updateTerm}
                      onEngineChange={this.updateEngine}
          />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
            />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      canSave={this.canSave}
            />
          </div>
        </div>
     </div>
    );
  }
}

export default App;