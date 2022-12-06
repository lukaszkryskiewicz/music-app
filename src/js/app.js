import { classNames, settings/*, templates*/, select } from './settings.js';
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

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.menuLinks = document.querySelectorAll(select.menu.links);
    console.log(thisApp.menuLinks);


    thisApp.activatePage(thisApp.pages[0].id);

    for (let link of thisApp.menuLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);

      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    console.log(pageId);

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisApp.menuLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
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

    const discoverLink = document.querySelector('.menu-links a[href="#discover"]');
    discoverLink.addEventListener('click', function () {
      thisApp.Discover = new Discover(thisApp.discoverContainer, thisApp.data.songs);
    });

  },



  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();
    thisApp.initDiscover();
    console.log(thisApp.songData);

  }
};

app.init();