import { classNames, settings, select } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
import Categories from './components/Categories.js';

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
      });

  },

  initSongs: function () {
    const thisApp = this;
    thisApp.songList = thisApp.data.songs;
    thisApp.songCategories = [];

    const songWrapper = select.containerOf.songsList;

    for (let song in thisApp.songList) {
      new Song(thisApp.songList[song].id, thisApp.songList[song], songWrapper);
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

  initDiscover: function () {
    const thisApp = this;

    thisApp.discoverContainer = document.querySelector(select.containerOf.discover);

    const discoverLink = document.querySelector(select.link.discover);
    discoverLink.addEventListener('click', function () {
      thisApp.discover = new Discover(thisApp.discoverContainer, thisApp.data.songs);
      thisApp.initUpper();
    });

  },

  initSearch: function () {
    const thisApp = this;

    thisApp.searchContainer = document.querySelector(select.containerOf.search);

    const searchLink = document.querySelector(select.link.search);
    searchLink.addEventListener('click', function () {
      thisApp.search = new Search(thisApp.searchContainer, thisApp.data.songs);
      thisApp.initUpper();
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
    //  thisApp.initCategories();
    thisApp.initHome();
    thisApp.initSearch();
    thisApp.initDiscover();

    thisApp.initUpper();

  }
};

app.init();