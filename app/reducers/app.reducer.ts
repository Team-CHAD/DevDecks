import { remote } from 'electron';
import * as constants from 'constants/app.constants';

const deviceDimension = {
  width: window.screen.width,
  height: window.screen.height
};

const initialAppState = {
  deviceDimension,
  currentSlide: 0,
  currentSelectedPlugin: {
    pluginNumber: 0,
    slideNumber: 0
  },
  isDragging: false,
  isFullScreen: false,
  lastSavedSlideDimensions: deviceDimension,
  slidesDimension: {
    width: deviceDimension.width * .75,
    height: deviceDimension.height * .75
  },
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

    case constants.SAVE_LAST_SLIDE_DIMENSION: {
      return Object.assign({}, state, { lastSavedSlideDimensions: action.dimensions });
    }

    case constants.SET_ACTIVE_PLUGIN: {
      return Object.assign({}, state, { currentSelectedPlugin: action.newActivePlugin });
    }

    case constants.TOGGLE_FULLSCREEN: {
      const window = remote.getCurrentWindow();
      if (state.isFullScreen) {
        window.setMenuBarVisibility(true);
        window.setFullScreen(false)
      } else {
        window.setMenuBarVisibility(false);
        window.setFullScreen(true);
      }

      return Object.assign({}, state, { isFullScreen: !state.isFullScreen });
    }

    case constants.TOGGLE_GUIDELINES: {
      return Object.assign({}, state, { isDragging: !state.isDragging });
    }  
    
    case constants.UPDATE_DEVICE_DIMENSION: {
      return Object.assign({}, state, { deviceDimension: action.newDeviceDimension });
    }

    case constants.UPDATE_SLIDES_DIMENSION: {
      return Object.assign({}, state, { slidesDimension: action.slidesDimension })
    }

    default: {
      return state;
    }
  }
};

export { appReducer };
