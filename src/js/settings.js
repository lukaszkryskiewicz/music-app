export const select = {
  templateOf: {
    songsList: '#template-songs-list',
  },
  containerOf: {
    songsList: '#song-list',
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
};