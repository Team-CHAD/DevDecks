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

export function deleteSlide(slideToDelete: number) {
  return {
    type: constants.DELETE_SLIDE,
    slideToDelete, 
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

