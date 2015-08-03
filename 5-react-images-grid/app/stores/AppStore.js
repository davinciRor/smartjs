import Store from '.';
import ActionTypes from '../constants/ActionTypes';

class AppStore extends Store {
  constructor() {
    super();

    this._state = {
      rows: 3,
      cells: 4,
      images: [],
      carousel: {
        width: 260,
        count: 3,
        position: 0,
        carouselImages: []
      }
    }
  }

  getState() {
    return this._state;
  }

  [ActionTypes.CHANGE_IMAGE_GRID]({ data }) {
    this._state.rows = data.rows;
    this._state.cells = data.cells;
    this.emitChange();
  }

  [ActionTypes.IMAGES_LOADED]({ data }) {
    data.forEach((image) => this._state.images.push(image));
    this.emitChange();
  }

  [ActionTypes.PREV_CAROUSEL]({ data }) {
    this._state.carousel.position = data;
    this.emitChange();
  }

  [ActionTypes.NEXT_CAROUSEL]({ data }) {
    this._state.carousel.position = data;
    this.emitChange();
  }

  [ActionTypes.ADD_IMAGE_IN_CAROUSEL]({ imageSrc }) {
    this._state.carousel.carouselImages.unshift(imageSrc);
    this.emitChange();
  }

}

export default new AppStore;
