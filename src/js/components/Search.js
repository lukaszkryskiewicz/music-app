import { /*settings,*/ templates, select } from '../settings.js';
import SearchSong from './SearchSong.js';

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
    console.log(element);

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  getElements() {
    const thisSearch = this;

    thisSearch.dom.input = document.querySelector(select.search.input);
    thisSearch.dom.form = document.querySelector(select.search.form);
    thisSearch.input = thisSearch.dom.form.querySelector('.input-song');
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
    //const thisSearch = this;

    for (const song of data) {
      if (song.title.toLowerCase().includes(searchValue.toLowerCase())) {
        new SearchSong(song);
      } else {
        console.log('test oblany')
        console.log(song.title)
        console.log(searchValue)
      }
    }
  }
}

export default Search;