import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as Api from '../api/Api';

export function changeImageGrid(data) {
  AppDispatcher.dispatch({
    type: ActionTypes.CHANGE_IMAGE_GRID,
    data
  });
}

export function getImages() {
  Api.getImages().then(
    data => AppDispatcher.dispatch({
      type: ActionTypes.IMAGES_LOADED,
      data
    }),
    error => AppDispatcher.dispatch({
      type: ActionTypes.IMAGES_LOAD_ERROR,
      error
    })
  )
}

export function carouselPrev(data) {
  AppDispatcher.dispatch({
    type: ActionTypes.PREV_CAROUSEL,
    data
  });
}

export function carouselNext(data) {
  AppDispatcher.dispatch({
    type: ActionTypes.NEXT_CAROUSEL,
    data
  });
}

export function addImageInCarousel(imageSrc) {
  AppDispatcher.dispatch({
    type: ActionTypes.ADD_IMAGE_IN_CAROUSEL,
    imageSrc
  });
}
