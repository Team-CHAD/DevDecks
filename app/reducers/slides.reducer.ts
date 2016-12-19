import { cloneDeep } from '../utils/helpers';
import * as constants from '../constants/slides.constants';

interface Slide {
  plugins: any[];
  state: {
    backgroundColor: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  };
}

const initialSlideState: Slide = {
  plugins: [],
  state: {
    backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
  },
};

const initialSlidesState: Slide[] = [ initialSlideState ];

const slidesReducer = (state: any = initialSlidesState, action: any) => {
  switch (action.type) {
    case constants.ADD_PLUGIN_TO_CURRENT_SLIDE: {
      const { plugin, slideNumber } = action;
      const slides = cloneDeep(state);
      slides[slideNumber].plugins.push(plugin);
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
      slides[slideNumber].plugins[pluginNumber] = null;
      return slides;
    }

    case constants.DELETE_SLIDE: {
      const slides = state.slice();
      slides.splice(action.slideToDelete, 1);
      return slides;
    }

    case constants.MOVE_SLIDE_DOWN: {
      const { slideNumber } = action;
      const slides = state.slice();

      if (slideNumber === 0) return slides;

      const currentSlide = slides[slideNumber];
      const previousSlide = slides[slideNumber - 1];
      slides[slideNumber] = previousSlide;
      slides[slideNumber - 1] = currentSlide;

      return slides;
    }

    case constants.MOVE_SLIDE_UP: {
      const { slideNumber } = action;
      const slides = state.slice();

      if (slideNumber >= state.length - 1) return slides;

      const currentSlide = slides[slideNumber];
      const nextSlide = slides[slideNumber + 1];
      slides[slideNumber] = nextSlide;
      slides[slideNumber + 1] = currentSlide;

      return slides;
    }

    case constants.OPEN_FILE: {
      return action.newStateFromFile;
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
