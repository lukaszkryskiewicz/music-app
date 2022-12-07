
import { /*settings,*/ templates, select } from '../settings.js';
import utils from '../utils.js';

class SearchSong {
  constructor(data) {
    const thisSearchSong = this;

    thisSearchSong.data = data;
    console.log(thisSearchSong.data.id);
    thisSearchSong.renderSongs();
    thisSearchSong.prepareId(thisSearchSong.data.id);
    thisSearchSong.initPlugin();
  }

  renderSongs() {
    const thisSearchSong = this;

    const generatedHTML = templates.searchSong(thisSearchSong.data);
    thisSearchSong.element = utils.createDOMFromHTML(generatedHTML);
    const songContainer = document.querySelector(select.containerOf.searchSong);
    songContainer.appendChild(thisSearchSong.element);

  }

  prepareId(dataId) {
    const thisSearchSong = this;

    thisSearchSong.playerId = ('.search-song-player-' + dataId);
  }

  initPlugin() {
    const thisSearchSong = this;
    // eslint-disable-next-line no-undef
    thisSearchSong.greenAudioPlayer = new GreenAudioPlayer(thisSearchSong.playerId, {
      stopOthersOnPlay: true,
    });
  }

}

export default SearchSong;

