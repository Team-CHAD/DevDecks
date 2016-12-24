import * as constants from '../constants/slides.constants';

export function addPluginToCurrentSlide(plugin: any, slideNumber: number) {
  return {
    type: constants.ADD_PLUGIN_TO_CURRENT_SLIDE,
    plugin,
    slideNumber,
  };
}

export function addSlide(currentSlide: number) {
  return {
    type: constants.ADD_SLIDE,
    currentSlide,
  };
}

export function deleteCurrentPlugin(pluginNumber: any, slideNumber: number) {
  return {
    type: constants.DELETE_CURRENT_PLUGIN,
    pluginNumber,
    slideNumber,
  };
}

export function deleteSlide(slideToDelete: number) {
  return {
    type: constants.DELETE_SLIDE,
    slideToDelete,
  };
}

export function moveSlideDown(slideNumber: number) {
  return {
    type: constants.MOVE_SLIDE_DOWN,
    slideNumber,
  }
}

export function moveSlideUp(slideNumber: number) {
  return {
    type: constants.MOVE_SLIDE_UP,
    slideNumber,
  }
}

export function openFile(newStateFromFile: Object) {
  return {
    type: constants.OPEN_FILE,
    newStateFromFile,
  };
}

export function openNewDeck() {
  return {
    type: constants.OPEN_NEW_DECK
  };
}

export function updateCurrentPlugin(pluginNumber: number, slideNumber: number, changes: Object) {
  return {
    type: constants.UPDATE_CURRENT_PLUGIN,
    changes,
    pluginNumber,
    slideNumber,
  };
}

export function updateCurrentSlide(slideNumber: number, changes: Object) {
  return {
    type: constants.UPDATE_CURRENT_SLIDE,
    changes,
    slideNumber,
  };
}
