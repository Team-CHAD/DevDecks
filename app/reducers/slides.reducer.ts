import { cloneDeep } from '../utils/helpers';
import * as constants from '../constants/slides.constants';

const initialSlidesState: any = [ { plugins: [] } ];

const slidesReducer = (state: any = initialSlidesState, action: any) => {
  switch (action.type) {
    case constants.ADD_PLUGIN_TO_CURRENT_SLIDE: {
      const slides = cloneDeep(state);
      slides[action.slideNumber].plugins.push(action.plugin);
      return slides;
    }

    case constants.ADD_SLIDE: {
      const slides = state.slice();
      slides.splice(action.currentSlide + 1, 0, { plugins: [] });
      return slides;
    }

    case constants.DELETE_SLIDE: {
      const slides = state.slice();
      slides.splice(action.slideToDelete, 1);
      return slides;
    }
    
    case constants.UPDATE_CURRENT_PLUGIN: {
      const { pluginNumber, slideNumber } = action;
      const slides = cloneDeep(state);
      const plugin = slides[slideNumber].plugins[pluginNumber];

      for (const change in action.changes) {
        plugin.state[change] = action.changes[change];
      }

      return slides;
    }

    default: {
      return state;
    }
  }
}

export { slidesReducer };
