import { /*settings,*/ templates } from '../settings.js';
import RandomSong from './RandomSong.js';

class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.data = data;

    thisDiscover.getRandom();
    thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
    thisDiscover.render(element);
    thisDiscover.initWidget();

  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discover();
    console.log(element);

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget() {
    const thisDiscover = this;

    thisDiscover.widget = thisDiscover.dom.wrapper.querySelector('.discover-subtitle');

    thisDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      thisDiscover.getRandom();
      thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
    });
  }

  getRandom() {
    const thisDiscover = this;

    thisDiscover.randomId = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(thisDiscover.randomId);
  }

  randomSong(id, data) {
    const thisDiscover = this;

    thisDiscover.randomSongGenerator = new RandomSong(id, data);
  }
}

export default Discover;