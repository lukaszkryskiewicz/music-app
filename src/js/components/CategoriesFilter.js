import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class CategoriesFilter {
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
    console.log(categories)

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

      if (clickedElement.classList.contains('category')) {
        if (thisCategories.clickedCategory && thisCategories.clickedCategory !== clickedElement.id) {
          const previouslySelected = document.getElementById(thisCategories.clickedCategory);
          previouslySelected.classList.remove('active');
          thisCategories.clickedCategory = null;
        }
        thisCategories.clickedCategory = thisCategories.clickedCategory ? null : clickedElement.id;
        clickedElement.classList.toggle('active');

        thisCategories.filterSongs(thisCategories.clickedCategory);
      }
    });

  }

  filterSongs(category) {
    const thisCategories = this;

    if (category == null) {
      for (const hiddenSong of thisCategories.hiddenSongs) {
        const hiddenSongFinder = document.querySelector('#home .song-' + hiddenSong.id);
        hiddenSongFinder.classList.remove('hidden');
      }
    } else {
      for (let song of thisCategories.data.songs) {
        const songFinder = document.querySelector('#home .song-' + song.id);
        if (!song.categories.includes(category)) {
          songFinder.classList.add('hidden');
          thisCategories.hiddenSongs.push(song);
        } else if (song.categories.includes(category)) {
          songFinder.classList.remove('hidden');
          thisCategories.hiddenSongs.splice(thisCategories.hiddenSongs[song], 1);
        }
      }
    }
  }
}


export default CategoriesFilter;