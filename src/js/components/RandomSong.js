import { /*settings,*/ templates, select } from '../settings.js';
import utils from '../utils.js';

class RandomSong {
  constructor(id, data) {
    const thisRandomSong = this;

    thisRandomSong.id = id - 1; //zastanow sie moze jak tego uniknąc? 
    thisRandomSong.data = data;
    console.log(thisRandomSong.id);
    console.log(thisRandomSong.data[thisRandomSong.id]);
    thisRandomSong.renderSongs();
    thisRandomSong.initPlugin();
  }

  renderSongs() {
    const thisRandomSong = this;

    const generatedHTML = templates.randomSong(thisRandomSong.data[thisRandomSong.id]);
    thisRandomSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(select.containerOf.randomSong);
    songContainer.innerHTML = '';
    songContainer.appendChild(thisRandomSong.element);

  }

  initPlugin() {
    const thisRandomSong = this;
    // eslint-disable-next-line no-undef
    thisRandomSong.greenAudioPlayer = new GreenAudioPlayer('.random-song-player', {
      stopOthersOnPlay: true,
    });
  }

}

export default RandomSong;