import * as constants from './constants';
import { IAppAction, ITextBoxPlugin } from './interfaces';

export function addSlide(): IAppAction {
  return {
    type: constants.ADD_SLIDE,
  };
}

export function deleteSlide(idxOfSlideToDelete: number): IAppAction {
  return {
    type: constants.DELETE_SLIDE,
    idxOfSlideToDelete,
  };
}

export function toggleFullscreenMode() {
  return {
    type: constants.TOGGLE_FULLSCREEN_MODE,
  };
}

export function rightArrowNext() {
  return {
    type: constants.RIGHT_ARROW_NEXT,
  };
}

export function leftArrowPrev() {
  return {
    type: constants.LEFT_ARROW_PREV,
  };
}

export function updateCurrentSlide(pluginNumber: number, changes: Object) {
  return {
    type: constants.UPDATE_CURRENT_SLIDE,
    changes,
    pluginNumber,
  };
}
