import * as constants from 'constants/app.constants';

export function addThemeColor(color: string) {
  return {
    type: constants.ADD_THEME_COLOR,
    color,
  };
}

export function goToSlide(slideNumber: number, maxSlides?: number) {
  return {
    type: constants.GO_TO_SLIDE,
    slideNumber,
    maxSlides,
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

export function saveLastSlideDimensions(dimensions: { width: number; height: number; }) {
  return {
    type: constants.SAVE_LAST_SLIDE_DIMENSION,
    dimensions
  };
}

export function setActivePlugin(moduleName?: string, pluginNumber?: number, slideNumber?: number) {
  const isPluginDeleted = !moduleName || pluginNumber === undefined  || slideNumber === undefined;
  return {
    type: constants.SET_ACTIVE_PLUGIN,
    newActivePlugin: isPluginDeleted ? null : { moduleName, pluginNumber, slideNumber },
  };
}

export function toggleFullScreen() {
  return {
    type: constants.TOGGLE_FULLSCREEN,
  };
}

export function toggleGuidelines() {
  return {
    type: constants.TOGGLE_GUIDELINES,
  };
}

export function updateDeviceDimension(newDeviceDimension: { width: number, height: number }) {
  return {
    type: constants.UPDATE_DEVICE_DIMENSION,
    newDeviceDimension,
  };
}

export function updateSlidesDimension(slidesDimension: { width: number; height: number; }) {
  return {
    type: constants.UPDATE_SLIDES_DIMENSION,
    slidesDimension,
  };
}
