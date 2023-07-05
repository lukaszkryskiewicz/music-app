import { templates } from '../settings.js';
import utils from '../utils.js';
import SongPlayer from './SongPlayer.js';

class Song {
  constructor(data, wrapper) {
    const thisSong = this;

    thisSong.lastPlayedSong = null;

    thisSong.data = data;
    thisSong.wrapper = wrapper;

    thisSong.renderSongs(thisSong.wrapper);
    thisSong.player();
  }

  renderSongs(wrapper) {
    const thisSong = this;

    const generatedHTML = templates.song(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(wrapper);
    songContainer.appendChild(thisSong.element);

  }

  player() {
    const thisSong = this;

    thisSong.greenAudioPlayer = new SongPlayer(thisSong.wrapper, thisSong.data.id);
    thisSong.player = document.querySelector(thisSong.greenAudioPlayer.playerId + ' audio');
    thisSong.player.addEventListener('play', function () {
      thisSong.lastPlayedSong = thisSong.greenAudioPlayer.playerId.slice(-1);
    });
  }

}

export default Song;