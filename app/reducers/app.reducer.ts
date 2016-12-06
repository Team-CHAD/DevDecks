import * as constants from '../constants/app.constants';

const initialAppState = {
  currentSlide: 0,
  currentSelectedPlugin: { slideNumber: 0, pluginNumber: 0 },
  isFullscreen: false,
};

const appReducer = (state: any = initialAppState, action: any) => {
  switch (action.type) {
    case constants.GO_TO_SLIDE: {
      return Object.assign({}, state, {
        currentSlide: action.slideNumber,
      });
    }

    case constants.LEFT_ARROW_PREV: {
      const currentSlide: number = state.currentSlide - 1;
      return Object.assign({}, state, { currentSlide });
    }

    case constants.RIGHT_ARROW_NEXT: {
      const currentSlide: number = state.currentSlide + 1;
      return Object.assign({}, state, { currentSlide });
    }

    case constants.SET_ACTIVE_PLUGIN: {
      return Object.assign({}, state, { 
        currentSelectedPlugin: action.newActivePlugin 
      });
    }

    case constants.TOGGLE_FULLSCREEN_MODE: {
      return Object.assign({}, state, { isFullscreen: !state.isFullscreen });
    }

    default: {
      return state;
    }
  }
};

export { appReducer };
