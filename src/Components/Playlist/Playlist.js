import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
      super(props);

      this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
      this.props.onNameChange(event.target.value);
    }

    render() {
      return (
        <div className="Playlist">
          <input value={this.props.playlistName} onChange={this.handleNameChange}/>
          {/*<!-- Add a TrackList component -->*/}
          <TrackList tracks={this.props.playlistTracks}
                     onRemove={this.props.onRemove}
                     isRemoval={true}
          />
          {this.props.canSave && <button className="Playlist-save">SAVE TO SPOTIFY</button>}
        </div>
      );
    }
}

export default Playlist;
