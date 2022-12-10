import { classNames, settings, templates, select } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';

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

    const songWrapper = select.containerOf.songsList;

    for (let song in thisApp.data.songs) {
      new Song(thisApp.songList[song].id, thisApp.songList[song], songWrapper); //moze zmienić na stałą? TERAZ TRZEBA SKOPIOWAC TO NA SEARCH SONG I RANDOM SONG!!!! 

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

  initSearch: function () {
    const thisApp = this;

    thisApp.searchContainer = document.querySelector(select.containerOf.search);

    console.log(thisApp.searchContainer);

    const searchLink = document.querySelector('.menu-links a[href="#search"]');
    searchLink.addEventListener('click', function () {
      thisApp.Search = new Search(thisApp.searchContainer, thisApp.data.songs);
    });

  },

  initUpper: function () {
    const thisApp = this;

    thisApp.upperElements = document.querySelectorAll('.upper');

    for (const element of thisApp.upperElements) {
      element.style.textTransform = 'uppercase';
    }
  },



  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();
    thisApp.initSearch();
    thisApp.initDiscover();
    thisApp.initUpper();

    console.log(thisApp.songData);

  }
};

app.init();