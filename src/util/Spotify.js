import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';
import * as SpotifyData from './data_spotify';

function Spotify () {
  const [accessToken, setAccessToken] = useState('');
  const [accessUrl, setAccessUrl] = useState('');

  const getAccessToken = ()  => {
    if(accessToken !== '') return accessToken;

    /* get the access token */
    if(accessUrl === '') {
      // Get the hash of the url
      const hash = window.location.hash
                  .substring(1)
                  .split('&')
                  .reduce(function (initial, item) {
                    if (item) {
                      let parts = item.split('=');
                      initial[parts[0]] = decodeURIComponent(parts[1]);
                    }                 
                    return initial;
                  }, {});
      window.location.hash = '';

      // Set token
      let _token = hash.access_token;

      const authEndpoint = SpotifyData.AUTH_BASE_URL;

      // Replace with your app's client ID, redirect URI and desired scopes
      const clientId = SpotifyData.CLIENT_ID;
      const redirectUri = SpotifyData.REDIRECT_URL;
      const scopes = ['playlist-modify-public'];

      // If there is no token, redirect to Spotify authorization
      if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
      }
      
      /* store the returned URL and retrive the access token and expire time */
      setAccessUrl(window.location.href);
      _token = accessUrl.match(/access_token=([^&]*)/);
      setAccessToken(_token);
      const _expiresIn = accessUrl.match(/expires_in=([^&]*)/);

      /* set expire time and clean the token from the url */
      window.setTimeout(() => setAccessToken(''),_expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }

    const SearchBar = (searchTerm, callback) => {

    };

    const retrivePlaylist = (callback) => {

    };

  };
  


};

export default Spotify;