import * as constants from './constants';

export interface IAction {
  type: string,
  idxOfSlideToDelete?: number,
  isFullscreen?: boolean,
  // newSlide?: React.Component<{}, {}>,
  newSlide?: string,
}

export function addSlide(): IAction {
  return {
    type: constants.ADD_SLIDE,
    newSlide: 'test',
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