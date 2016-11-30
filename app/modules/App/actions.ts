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
    newSlide: { components: [] },
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

export function addPluginToCurrentSlide (component:any){
  return {
    type: constants.ADD_PLUGIN_TO_CURRENT_SLIDE,
    component,
  }
}
