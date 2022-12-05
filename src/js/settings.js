export const select = {
  templateOf: {
    songsList: '#template-songs-list',
    home: '#template-home',
    discover: '#template-discover',
  },
  containerOf: {
    songsList: '.song-list',
    home: '.home-wrapper',
    discover: '.discover-wrapper',
  }
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  }
};

export const templates = {
  songsList: Handlebars.compile(document.querySelector(select.templateOf.songsList).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
};