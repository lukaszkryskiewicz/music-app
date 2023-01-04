export const select = {
  templateOf: {
    songsList: '#template-songs-list',
    home: '#template-home',
    discover: '#template-discover',
    search: '#template-search',
    categories: '#template-categories'
  },
  containerOf: {
    songsList: '#home .song-list',
    home: '.home-wrapper',
    discover: '.discover-wrapper',
    pages: '#pages',
    randomSong: '#discover .song-list',
    search: '.search-wrapper',
    searchSong: '#search .song-list',
    categories: '.categories-wrapper',
    menu: '.menu-links'
  },
  menu: {
    links: '.menu-links a',
  },
  search: {
    input: '.input-song',
    form: '.song-search',
    result: '.result-text',
    category: '.category-input'
  },
  link: {
    search: '.menu-links a[href="#search"]',
    discover: '.menu-links a[href="#discover"]',
  },
  discover: {
    subtitle: '.discover-subtitle',
  },
  player: {
    ready: '.ready-player-'
  }

};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  }
};

export const classNames = {
  pages: {
    active: 'active',
  },

  nav: {
    active: 'active',
  },
};

export const templates = {
  song: Handlebars.compile(document.querySelector(select.templateOf.songsList).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  categories: Handlebars.compile(document.querySelector(select.templateOf.categories).innerHTML),

};