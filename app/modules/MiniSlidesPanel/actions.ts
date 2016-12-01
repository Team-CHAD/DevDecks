import * as constants from '../../modules/App/constants';

export function goToSlide(miniSlideIndex: number) {
  return {
    type: constants.GO_TO_SLIDE,
    miniSlideIndex,
  };
}
