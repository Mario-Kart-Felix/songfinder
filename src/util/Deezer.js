import * as DeezerData from './data_deezer';

const rapidApiHeaders = {
  'x-rapidapi-key': DeezerData.rapidApiKey,
  'x-rapidapi-host': DeezerData.rapidApiHost,
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-cache',
  'useQueryString':true,
};

const Deezer = {
  
  async search(searchTerm,callback) {

    const endpoint = `${DeezerData.rapidApiUrl}${DeezerData.queryParams}${searchTerm}`;
   // console.log(endpoint);
  
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: rapidApiHeaders
      });
      
      if(response.ok) {
        const jsonResnponse = await response.json();
       // console.log(jsonResnponse);
       return callback(jsonResnponse);
      }
      throw new Error('Request failed!');
   }
   catch(err) {
    console.log(err);
   }

  },
  
  /* retrive the playlist from the website */
  async retrivePlaylist(callback) {
    const endpoint = `${DeezerData.rapidApiUrl}${DeezerData.queryPlaylistTracks}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: rapidApiHeaders
      });
      
      if(response.ok) {
        const jsonResnponse = await response.json();
        let tracks = [];
        console.log(jsonResnponse);

        if(jsonResnponse && jsonResnponse.data.length > 0) {
          tracks = jsonResnponse.data.map(item => {
            let newItem = {};
            return newItem = {
              name: item.title_short,
              artist: item.artist.name,
              album: item.album.title,
              id: item.id,
              link: item.link,
            };
          });
        }
        return callback(tracks);
      }
      throw new Error('Request failed!');
    }
   catch(err) {
    console.log(err);
   }
  }

};

export default Deezer;