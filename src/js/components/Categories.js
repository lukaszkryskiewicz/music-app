import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class Categories {
  constructor(element, categories, data) {
    const thisCategories = this;

    thisCategories.categoryList = categories;
    thisCategories.data = data;
    thisCategories.hiddenSongs = [];

    thisCategories.render(element, categories);
    thisCategories.initWidget();


  }

  render(element, categories) {
    const thisCategories = this;

    const generatedHTML = templates.categories(categories);

    thisCategories.dom = {};
    thisCategories.dom.wrapper = element;
    thisCategories.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget() {
    const thisCategories = this;

    thisCategories.clickedCategory = null;

    const categoryList = thisCategories.dom.wrapper.querySelector('.categories-list');

    categoryList.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedElement = event.target;

      if (thisCategories.clickedCategory && thisCategories.clickedCategory !== clickedElement.id) {
        const previouslySelected = document.getElementById(thisCategories.clickedCategory);
        previouslySelected.classList.remove('active');
        thisCategories.clickedCategory = null;
      }

      thisCategories.clickedCategory = thisCategories.clickedCategory ? null : clickedElement.id;
      clickedElement.classList.toggle('active');

      /*      if (thisCategories.clickedCategory == null) {
             clickedElement.classList.add('active');
             thisCategories.clickedCategory = clickedElement.id;
           } else if (thisCategories.clickedCategory == clickedElement.id) {
             clickedElement.classList.remove('active');
             thisCategories.clickedCategory = null;
           } else if (thisCategories.clickedCategory != clickedElement.id) {
             const previouslySelected = document.getElementById(thisCategories.clickedCategory);
             previouslySelected.classList.remove('active');
             clickedElement.classList.add('active');
             thisCategories.clickedCategory = clickedElement.id;
           } */

      thisCategories.filterSongs(thisCategories.clickedCategory);

    });


  }

  filterSongs(category) {
    const thisCategories = this;

    if (category == 0) {
      for (const hiddenSong of thisCategories.hiddenSongs) {
        const hiddenSongFinder = document.querySelector('#home .song-' + hiddenSong.id);
        hiddenSongFinder.classList.remove('hidden');
      }
    } else {
      for (let song of thisCategories.data.songs) {
        const songFinder = document.querySelector('#home .song-' + song.id);
        if (song.categories.indexOf(category) == -1) {
          songFinder.classList.add('hidden');
          thisCategories.hiddenSongs.push(song);
        } else if (song.categories.indexOf(category) != -1) {
          songFinder.classList.remove('hidden');
          thisCategories.hiddenSongs.splice(thisCategories.hiddenSongs[song], 1);
        }
      }
    }
  }
}


export default Categories;