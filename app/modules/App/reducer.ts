import * as constants from './constants';
import { IAction } from './actions';

// NOTE: The reducers and actions should belong in some universal app folder
// that is shared amonst other reducers. Need to see where we can place it.

interface Slide {
  // slide: React.Component<{}, {}>,
  slide: any,
  components?: React.Component<{}, {}>[],
  functions?: Function[],
  index?: number,
}

interface IState {
  currentSlide: number,
  isFullscreen: boolean,
  slides: Slide[],
}

const initialState: IState = {
  currentSlide: 0,
  isFullscreen: false,
  slides: [],
};

const app = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case constants.ADD_SLIDE: {
      const slides = state.slides.slice();
      slides.push({ slide: action.newSlide });
      return Object.assign({}, state, { slides } );
    }

    case constants.DELETE_SLIDE: {
      const slides = state.slides.slice();
      slides.splice(action.idxOfSlideToDelete, 1);
      return Object.assign({}, state, { slides });
    }

    case constants.TOGGLE_FULLSCREEN_MODE: {
      return Object.assign({}, state, { isFullscreen: !state.isFullscreen });
    }

    default: {
      return state;
    }
  }
};

export { app };
