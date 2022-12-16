import { templates } from '../settings.js';
import utils from '../utils.js';
import songPlayer from './SongPlayer.js';

class Song {
  constructor(data, wrapper) {
    const thisSong = this;

    thisSong.data = data;
    thisSong.wrapper = wrapper;

    thisSong.renderSongs(thisSong.wrapper);
    thisSong.player();
  }

  renderSongs(wrapper) {
    const thisSong = this;

    const generatedHTML = templates.songsList(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(wrapper);
    songContainer.appendChild(thisSong.element);

  }

  player() {
    const thisSong = this;

    thisSong.greenAudioPlayer = new songPlayer(thisSong.wrapper, thisSong.data.id, {
      stopOthersOnPlay: true,
    });
  }

}

export default Song;