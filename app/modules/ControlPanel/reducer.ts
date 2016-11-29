import * as _ from 'lodash';
import * as constants from './constants';
import { IAction } from './actions';


interface Slide {
  // slide: React.Component<{}, {}>,
  slide: any,
  components?: React.Component<{}, {}>[],
  functions?: Function[],
  index?: number,
}

interface IState {
  slides: Slide[],
  currentSlide: number,
}

const initialState: IState = {
  slides: [],
  currentSlide: 0,
};

const app = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case constants.ADD_SLIDE: {
      return _.assign(state, {
        slides: _.clone(state.slides).push({ slide: action.newSlide })
      });
    }
    case constants.DELETE_SLIDE: {
      return _.assign(state, {
        slides: _.clone(state.slides).splice(action.idxOfSlideToDelete, 1)
      });
    }
    default: {
      return state;
    }
  }
};

export { app };
