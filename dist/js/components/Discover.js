import { select, templates } from '../settings.js';
import Song from './Song.js';

class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.data = data;


    thisDiscover.render(element);
    thisDiscover.initWidget();

  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discover();

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget() {
    const thisDiscover = this;

    thisDiscover.widget = thisDiscover.dom.wrapper.querySelector(select.discover.subtitle);

    thisDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      thisDiscover.getRandom(thisDiscover.data);
      thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
    });
  }

  getRandom(data) {
    const thisDiscover = this;
    thisDiscover.randomId = Math.floor(Math.random() * data.length + 1);
  }

  randomSong(id, data) {
    const thisDiscover = this;

    const randomSongWrapper = select.containerOf.randomSong;
    const songContainer = document.querySelector(randomSongWrapper);
    songContainer.innerHTML = '';

    thisDiscover.randomSongGenerator = new Song(data[id - 1], randomSongWrapper);
  }
}

export default Discover;