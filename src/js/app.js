import { settings/*, templates*/, select } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
import Discover from './components/Discover.js';

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
        console.log(thisApp.data.songs);
        thisApp.initSongs();
      });


  },

  initSongs: function () {
    const thisApp = this;
    thisApp.songList = thisApp.data.songs;

    for (let song in thisApp.data.songs) {
      new Song(thisApp.data.songs[song].id, thisApp.data.songs[song]); //moze zmienić na stałą?


    }
  },

  initHome: function () {
    const thisApp = this;

    thisApp.homeContainer = document.querySelector(select.containerOf.home);

    thisApp.Home = new Home(thisApp.homeContainer);
  },

  initDiscover: function () {
    const thisApp = this;

    thisApp.discoverContainer = document.querySelector(select.containerOf.discover);
    console.log(thisApp.data);

    thisApp.Discover = new Discover(thisApp.discoverContainer, thisApp.songList);
  },



  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initHome();
    thisApp.initDiscover();
    console.log(thisApp.songData);

  }
};

app.init();