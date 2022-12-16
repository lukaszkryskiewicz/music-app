import { /*settings,*/ select, templates } from '../settings.js';
import Song from './Song.js';

class NewDiscover {
  constructor(element, data, songCounter, listenedSongsCatObj) {
    const thisNewDiscover = this;

    thisNewDiscover.data = data;
    thisNewDiscover.songCounter = songCounter;
    thisNewDiscover.listenedSongsCatObj = listenedSongsCatObj;

    thisNewDiscover.render(element);
    thisNewDiscover.initWidget();

  }

  render(element) {
    const thisNewDiscover = this;

    const generatedHTML = templates.discover();

    thisNewDiscover.dom = {};
    thisNewDiscover.dom.wrapper = element;
    thisNewDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget() {
    const thisNewDiscover = this;

    thisNewDiscover.widget = thisNewDiscover.dom.wrapper.querySelector(select.discover.subtitle);

    thisNewDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      if (thisNewDiscover.songCounter <= 3) {
        thisNewDiscover.getRandom(thisNewDiscover.data);
        thisNewDiscover.randomSong(thisNewDiscover.randomId, thisNewDiscover.data);
      } else {
        thisNewDiscover.playPersonalizedSong();
      }
    });
  }

  getRandom(data) {
    const thisNewDiscover = this;
    thisNewDiscover.randomId = Math.floor(Math.random() * data.length + 1);
  }

  randomSong(id, data) {
    const thisNewDiscover = this;

    const randomSongWrapper = select.containerOf.randomSong;
    const songContainer = document.querySelector(randomSongWrapper);
    songContainer.innerHTML = '';

    thisNewDiscover.randomSongGenerator = new Song(data[id - 1], randomSongWrapper);
  }

  playPersonalizedSong() {
    const thisNewDiscover = this;
    let max = 0;
    thisNewDiscover.categoriesToDraw = [];
    for (let songCategory in thisNewDiscover.listenedSongsCatObj) {
      if (max < thisNewDiscover.listenedSongsCatObj[songCategory]) {
        thisNewDiscover.categoriesToDraw = [];
        thisNewDiscover.categoriesToDraw.push(songCategory);
        max = thisNewDiscover.listenedSongsCatObj[songCategory];
      } else if (max == thisNewDiscover.listenedSongsCatObj[songCategory]) {
        thisNewDiscover.categoriesToDraw.push(songCategory);
      }
    }
    thisNewDiscover.songToDraw = [];
    for (let song of thisNewDiscover.data) {
      for (let category of thisNewDiscover.categoriesToDraw) {
        if (song.categories.indexOf(category) != -1) {
          if (thisNewDiscover.songToDraw.indexOf(song) == -1)
            thisNewDiscover.songToDraw.push(song);
        }
      }
    }
    thisNewDiscover.getRandom(thisNewDiscover.songToDraw);
    thisNewDiscover.randomSong(thisNewDiscover.randomId, thisNewDiscover.songToDraw);

  }
}

export default NewDiscover;