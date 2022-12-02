import { settings/*, templates, select */ } from './settings.js';
import Song from './Song.js';

const app = {
  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
      });



  },

  initSongs: function () {
    const thisApp = this;

    for (let song in thisApp.data.songs) {
      new Song(thisApp.data.songs[song]);
      console.log(thisApp.data.songs[song]);

    }
  },


  init: function () {
    const thisApp = this;

    thisApp.initData();
    //thisApp.initSongs();
  }
};

app.init();