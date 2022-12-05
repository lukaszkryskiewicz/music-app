import { /*settings,*/ templates, /*select*/ } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);


  }

  render(element) {
    const thisHome = this;

    const generatedHTML = templates.home();
    console.log(element);

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default Home;