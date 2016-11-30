import * as constants from './constants';

export interface IAction {
  type: string,
  idxOfSlideToDelete?: number,
  isFullscreen?: boolean,
  // newSlide?: React.Component<{}, {}>,
  // TODO: how to nest object with keys
  newSlide?: Object,
  component?: any,
}

export function addSlide(): IAction {
  return {
    type: constants.ADD_SLIDE,
  };
}

export function deleteSlide(idxOfSlideToDelete: number): IAction {
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

export function addPluginToCurrentSlide (component:any){
  return {
    type: constants.ADD_PLUGIN_TO_CURRENT_SLIDE,
    component,
  }
}
