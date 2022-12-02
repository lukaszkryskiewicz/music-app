import { /*settings,*/ templates, select } from './settings.js';
import utils from './utils.js';
import songPlayer from './SongPlayer.js';

class Song {
  constructor(data) {
    const thisSong = this;

    thisSong.data = data;
    console.log(thisSong.data.id);

    thisSong.renderSongs();
    thisSong.player();
  }

  renderSongs() {
    const thisSong = this;

    const generatedHTML = templates.songsList(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(select.containerOf.songsList);
    songContainer.appendChild(thisSong.element);

  }

  player() {
    const thisSong = this;

    thisSong.greenAudioPlayer = new songPlayer(thisSong.data.id, {
      stopOthersOnPlay: true,
    });
  }
}

export default Song;