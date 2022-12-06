import { /*settings,*/ templates, select } from '../settings.js';
import utils from '../utils.js';
import songPlayer from './SongPlayer.js';

class Song {
  constructor(id, data) {
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;

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
    console.log(thisSong.id);

    thisSong.greenAudioPlayer = new songPlayer(thisSong.id, {
      stopOthersOnPlay: true,
    });
  }

}

export default Song;