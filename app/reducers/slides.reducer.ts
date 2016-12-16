import { cloneDeep } from '../utils/helpers';
import * as constants from '../constants/slides.constants';

interface Slide {
  plugins: any[];
  state: {
    backgroundColor: string;
  };
}

const initialSlideState: Slide = {
  plugins: [],
  state: {
    backgroundColor: 'white',
  },
};

const initialSlidesState: Slide[] = [ initialSlideState ];

const slidesReducer = (state: any = initialSlidesState, action: any) => {
  switch (action.type) {
    case constants.ADD_PLUGIN_TO_CURRENT_SLIDE: {
      const slides = cloneDeep(state);
      slides[action.slideNumber].plugins.push(action.plugin);
      return slides;
    }

    case constants.ADD_SLIDE: {
      const slides = state.slice();
      const newSlide = cloneDeep(initialSlideState);
      slides.splice(action.currentSlide + 1, 0, newSlide);
      return slides;
    }

    case constants.DELETE_CURRENT_PLUGIN: {
      const { pluginNumber, slideNumber } = action;
      const slides = cloneDeep(state);
      slides[action.slideNumber].plugins[pluginNumber] = null;
      return slides;
    }

    case constants.DELETE_SLIDE: {
      const slides = state.slice();
      slides.splice(action.slideToDelete, 1);
      return slides;
    }

    case constants.UPDATE_CURRENT_PLUGIN: {
      const { changes, pluginNumber, slideNumber } = action;
      const slides = cloneDeep(state);
      const plugin = slides[slideNumber].plugins[pluginNumber];

      for (const change in changes) {
        plugin.state[change] = changes[change];
      }

      return slides;
    }

    case constants.UPDATE_CURRENT_SLIDE: {
      const { changes, slideNumber } = action;
      const slides = cloneDeep(state);
      const slide = slides[slideNumber];

      for (const change in changes) {
        slide.state[change] = changes[change];
      }
      
      return slides;
    }

    default: {
      return state;
    }
  }
}

export { slidesReducer };
