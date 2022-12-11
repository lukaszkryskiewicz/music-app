import { /*settings,*/ templates, select } from '../settings.js';
import Song from './Song.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.getElements();
    thisSearch.initWidget(data);

  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.search();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  getElements() {
    const thisSearch = this;

    thisSearch.dom.form = document.querySelector(select.search.form);
    thisSearch.input = thisSearch.dom.form.querySelector(select.search.input);
    thisSearch.dom.resultNumber = document.querySelector(select.search.result);
  }

  initWidget(data) {
    const thisSearch = this;

    thisSearch.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      const songContainer = document.querySelector(select.containerOf.searchSong);
      songContainer.innerHTML = '';
      thisSearch.searchSong(thisSearch.input.value, data);
    });
  }


  searchSong(searchValue, data) {
    const thisSearch = this;
    thisSearch.songNumber = 0;

    const searchSongWrapper = select.containerOf.searchSong;

    for (const song of data) {
      if (song.title.toLowerCase().includes(searchValue.toLowerCase())) {
        new Song(song.id, song, searchSongWrapper);
        thisSearch.songNumber++;
      }
    }
    thisSearch.printValue(thisSearch.songNumber);
  }

  printValue(value) {
    const thisSearch = this;

    if (value == 1) {
      thisSearch.dom.resultNumber.innerHTML = 'We have found ' + value + ' song...';
    } else {
      thisSearch.dom.resultNumber.innerHTML = 'We have found ' + value + ' songs...';
    }
  }


}

export default Search;