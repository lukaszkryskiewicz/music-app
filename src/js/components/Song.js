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
    thisSong.getSongElements(id, data);
    // thisSong.prepareSongData();
    //this.getSongElements(data);
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

  getSongElements(id, data) {
    const thisSong = this;

    thisSong.songData = {}
    thisSong.songData[id] = data;



    console.log(thisSong.songData);

  }
}

export default Song;