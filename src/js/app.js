import { classNames, settings, select } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
//import Discover from './components/Discover.js';
import Search from './components/Search.js';
import Categories from './components/Categories.js';
import NewDiscover from './components/NewDiscover.js';

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

  initUpper: function () {
    const thisApp = this;

    thisApp.upperElements = document.querySelectorAll('.upper');

    for (const element of thisApp.upperElements) {
      element.style.textTransform = 'uppercase';
    }
  },

  newDiscover: function () {
    const thisApp = this;

    thisApp.listenedSongsCatObj = {};
    thisApp.listenedSongsCounter = 0;
    thisApp.playedSongId = null;
    thisApp.discoverContainer = document.querySelector(select.containerOf.discover);


    thisApp.homePlayers = document.querySelectorAll('#home .songs');
    for (const player of thisApp.homePlayers) {
      const playButton = player.querySelector('audio');
      playButton.addEventListener('play', function () {
        //  console.log(player.className.slice(-1));
        if (thisApp.playedSongId !== player.className.slice(-1)) {
          thisApp.playedSongId = player.className.slice(-1);
          const playedSongCategories = thisApp.data.songs[thisApp.playedSongId - 1].categories;
          for (let songCategory of playedSongCategories) {
            if (typeof thisApp.listenedSongsCatObj[songCategory] == 'undefined') {
              thisApp.listenedSongsCatObj[songCategory] = 1;
            } else thisApp.listenedSongsCatObj[songCategory]++;
          }
          console.log(thisApp.listenedSongsCatObj);
          thisApp.listenedSongsCounter++;
          console.log(thisApp.listenedSongsCounter);


          thisApp.discover = new NewDiscover(thisApp.discoverContainer, thisApp.data.songs, thisApp.listenedSongsCounter, thisApp.listenedSongsCatObj);
        }
      });

    }
    thisApp.discover = new NewDiscover(thisApp.discoverContainer, thisApp.data.songs, thisApp.listenedSongsCounter, thisApp.listenedSongsCatObj);

  },



  init: function () {
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
    thisApp.initHome();
    thisApp.initUpper();

  }
};

app.init();