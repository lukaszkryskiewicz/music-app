import { /*settings,*/ templates } from '../settings.js';
import Song from './Song.js';

class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.getRandom();
    thisDiscover.randomSong(thisDiscover.randomId, data);


  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discover();
    console.log(element);

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  getRandom() {
    const thisDiscover = this;

    thisDiscover.randomId = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(thisDiscover.randomId);
  }

  randomSong(id, data) {
    const thisDiscover = this;

    thisDiscover.randomSong = new Song(id, data);
  }
}

export default Discover;