import { /*settings,*/ templates } from '../settings.js';
import RandomSong from './RandomSong.js';

class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.getRandom();
    thisDiscover.randomSong(thisDiscover.randomId, data);
    thisDiscover.render(element);


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

    thisDiscover.randomSong = new RandomSong(id, data);
  }
}

export default Discover;