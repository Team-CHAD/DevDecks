import * as constants from '../constants/app.constants';

export function goToSlide(slideNumber: number) {
  return {
    type: constants.GO_TO_SLIDE,
    slideNumber,
  };
}

export function leftArrowPrev() {
  return {
    type: constants.LEFT_ARROW_PREV,
  };
}

export function rightArrowNext() {
  return {
    type: constants.RIGHT_ARROW_NEXT,
  };
}

export function setActivePlugin(pluginNumber: number, slideNumber: number) {
  return {
    type: constants.SET_ACTIVE_PLUGIN,
    newActivePlugin: { pluginNumber, slideNumber },
  };
}

export function toggleFullscreenMode() {
  return {
    type: constants.TOGGLE_FULLSCREEN_MODE,
  };
}

export function updateSlidesDimension(slidesDimension: { width: number; height: number; }) {
  return {
    type: constants.UPDATE_SLIDES_DIMENSION,
    slidesDimension,
  };
}
