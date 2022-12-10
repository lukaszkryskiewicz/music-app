export const select = {
  templateOf: {
    songsList: '#template-songs-list',
    home: '#template-home',
    discover: '#template-discover',
    search: '#template-search',
  },
  containerOf: {
    songsList: '#home .song-list',
    home: '.home-wrapper',
    discover: '.discover-wrapper',
    pages: '#pages',
    randomSong: '#discover .song-list',
    search: '.search-wrapper',
    searchSong: '#search .song-list',
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
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
};