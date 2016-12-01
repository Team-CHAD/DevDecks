import * as _ from 'lodash';
import * as constants from './constants';
import { IAppAction, IAppState } from './interfaces';


const initialState: IAppState = {
  currentSlide: 0,
  isFullscreen: false,
  slides: [ { components: [] } ],
};

const app = (state: IAppState = initialState, action: IAppAction) => {
  switch (action.type) {
    case constants.ADD_SLIDE: {
      const slides = state.slides.slice();
      slides.push({ components: [] });
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

    case constants.RIGHT_ARROW_NEXT: {
      const currentSlide: number = state.currentSlide + 1;
      return Object.assign({}, state, { currentSlide })
    }

    case constants.LEFT_ARROW_PREV: {
      const currentSlide: number = state.currentSlide - 1;
      return Object.assign({}, state, { currentSlide })
    }

    case constants.ADD_PLUGIN_TO_CURRENT_SLIDE: {
      const slides = _.cloneDeep(state.slides);
      slides[state.currentSlide].components.push(action.plugin);
      return Object.assign({}, state, { slides });
    }

    case constants.UPDATE_TEXTBOX_TEXT: {
      const slides = _.cloneDeep(state.slides);
      slides[state.currentSlide].components[action.pluginIndex].value = action.text;
      return Object.assign({}, state, { slides });
    }

    case constants.GO_TO_SLIDE: {
      return Object.assign({}, state, {
        currentSlide: action.miniSlideIndex
      });
    }

    default: {
      return state;
    }
  }
};

export { app };
