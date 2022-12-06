export const select = {
  templateOf: {
    songsList: '#template-songs-list',
    home: '#template-home',
    discover: '#template-discover',
    randomSong: '#template-random-song',
    search: '#template-search',
    searchSong: '#template-search-song',
  },
  containerOf: {
    songsList: '.song-list',
    home: '.home-wrapper',
    discover: '.discover-wrapper',
    pages: '#pages',
    randomSong: '.random-song',
    search: '.search-wrapper',
    searchSong: '.search-song',
  },

  menu: {
    links: '.menu-links a',
  },
  search: {
    input: '.input-song',
    form: '.song-search',
  }
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  }
};

export const classNames = {
  pages: {
    active: 'active',
  },

  nav: {
    active: 'active',
  }
};

export const templates = {
  songsList: Handlebars.compile(document.querySelector(select.templateOf.songsList).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  randomSong: Handlebars.compile(document.querySelector(select.templateOf.randomSong).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  searchSong: Handlebars.compile(document.querySelector(select.templateOf.searchSong).innerHTML),
};