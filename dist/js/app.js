import { classNames, settings, select } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
//import Discover from './components/Discover.js';
import Search from './components/Search.js';
import Categories from './components/Categories.js';
import NewDiscover from './components/NewDiscover.js';
import Stats from './components/Stats.js';

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
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
      })
      .then(function () {
        thisApp.initSearch();
        //thisApp.initDiscover();
        thisApp.initStats();
        thisApp.newDiscover();


      });
  },

  initSongs: function () {
    const thisApp = this;
    thisApp.songList = thisApp.data.songs;
    thisApp.songCategories = [];

    thisApp.songHomeWrapper = select.containerOf.songsList;

    for (let song in thisApp.songList) {
      new Song(thisApp.songList[song], thisApp.songHomeWrapper);
      for (let category of thisApp.songList[song].categories) {
        if (thisApp.songCategories.indexOf(category) == -1) {
          thisApp.songCategories.push(category);
        }
      }
    }

    thisApp.homePlayers = document.querySelectorAll('#home .songs');
    for (const player of thisApp.homePlayers) {
      const playButton = player.querySelector('audio');
      playButton.addEventListener('play', function () {
        app.stats.playedSongIdCheck(player);
      });
    }

    thisApp.initCategories(thisApp.songCategories);
  },

  initCategories: function (categories) {
    const thisApp = this;
    thisApp.categoriesObject = { categories };

    thisApp.categoriesContainer = document.querySelector(select.containerOf.categories);

    thisApp.categories = new Categories(thisApp.categoriesContainer, thisApp.categoriesObject, thisApp.data);

  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.menuLinks = document.querySelectorAll(select.menu.links);
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.menuLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

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

    thisApp.home = new Home(thisApp.homeContainer);
  },

  /*  initDiscover: function () {
     const thisApp = this;
 
     thisApp.discoverContainer = document.querySelector(select.containerOf.discover);
 
     // thisApp.discover = new Discover(thisApp.discoverContainer, thisApp.data.songs);
     thisApp.newDiscover();
   }, */

  initSearch: function () {
    const thisApp = this;

    thisApp.searchContainer = document.querySelector(select.containerOf.search);

    thisApp.search = new Search(thisApp.searchContainer, thisApp.data.songs, thisApp.categoriesObject);

  },

  newDiscover: function () {
    const thisApp = this;

    thisApp.discoverContainer = document.querySelector(select.containerOf.discover);

    thisApp.discover = new NewDiscover(thisApp.discoverContainer, thisApp.data.songs, app.stats);
  },

  initStats() {
    const thisApp = this;

    thisApp.stats = new Stats(app);
  },




  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();

  }
};

app.init();