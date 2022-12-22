import { templates, select } from '../settings.js';
import Song from './Song.js';

class NewDiscover {
  constructor(element, data, stats) {
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.listenedSongsCatObj = stats.global.listenedSongsCatObj;

    thisDiscover.render(element);
    thisDiscover.initWidget(stats);

  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discover();

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget(stats) {
    const thisDiscover = this;

    thisDiscover.widget = thisDiscover.dom.wrapper.querySelector(select.discover.subtitle);

    thisDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      if (stats.global.listenedSongsCounter <= 3) {
        thisDiscover.getRandom(thisDiscover.data);
        thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
      } else {
        //thisDiscover.playPersonalizedSong();
        stats.categoriesToDraw();
        stats.songsToDraw();
        thisDiscover.getRandom(stats.global.songToDrawArray);
        thisDiscover.randomSong(thisDiscover.randomId, stats.global.songToDrawArray);
      }
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

  /* playPersonalizedSong() {
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
    console.log(thisDiscover.categoriesToDraw);
    thisDiscover.songToDraw = [];
    for (let song of thisDiscover.data) {
      for (let category of thisDiscover.categoriesToDraw) {
        if (song.categories.indexOf(category) != -1) {
          if (thisDiscover.songToDraw.indexOf(song) == -1) {
            thisDiscover.songToDraw.push(song);
          }
        }

      }
    }
    thisDiscover.getRandom(thisDiscover.songToDraw);
    thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.songToDraw);

  } */
}

export default NewDiscover;