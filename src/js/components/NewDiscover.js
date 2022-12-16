import { select } from '../settings.js';
import Discover from './Discover.js';

class NewDiscover extends Discover {
  constructor(element, data, songCounter, listenedSongsCatObj) {
    super(element, data);
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.songCounter = songCounter;
    thisDiscover.listenedSongsCatObj = listenedSongsCatObj;

    thisDiscover.render(element);
    thisDiscover.initWidget();

  }

  initWidget() {
    const thisDiscover = this;

    thisDiscover.widget = thisDiscover.dom.wrapper.querySelector(select.discover.subtitle);

    thisDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      if (thisDiscover.songCounter <= 3) {
        thisDiscover.getRandom(thisDiscover.data);
        thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
      } else {
        thisDiscover.playPersonalizedSong();
      }
    });
  }

  playPersonalizedSong() {
    const thisDiscover = this;
    let max = 0;
    thisDiscover.categoriesToDraw = [];
    for (let songCategory in thisDiscover.listenedSongsCatObj) {
      if (max < thisDiscover.listenedSongsCatObj[songCategory]) {
        thisDiscover.categoriesToDraw = [];
        thisDiscover.categoriesToDraw.push(songCategory);
        max = thisDiscover.listenedSongsCatObj[songCategory];
      } else if (max == thisDiscover.listenedSongsCatObj[songCategory]) {
        thisDiscover.categoriesToDraw.push(songCategory);
      }
    }
    thisDiscover.songToDraw = [];
    for (let song of thisDiscover.data) {
      for (let category of thisDiscover.categoriesToDraw) {
        if (song.categories.indexOf(category) != -1) {
          if (thisDiscover.songToDraw.indexOf(song) == -1)
            thisDiscover.songToDraw.push(song);
        }
      }
    }
    thisDiscover.getRandom(thisDiscover.songToDraw);
    thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.songToDraw);

  }
}

export default NewDiscover;