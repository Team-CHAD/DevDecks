import * as constants from './constants';

export interface IAction {
  type: string,
  // newSlide?: React.Component<{}, {}>,
  newSlide?: string,
  idxOfSlideToDelete?: number,
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
  }
}
