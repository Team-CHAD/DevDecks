import { remote } from 'electron';
import { cloneDeep } from '../utils/helpers';
import * as constants from 'constants/app.constants';

const undoable = require('redux-undo').default;
interface IDimensions {
  width: number;
  height: number;
}

interface InitialAppState {
  deviceDimension: IDimensions;
  currentSlide: number;
  currentSelectedPlugin: any;
  isDragging: boolean;
  isFullScreen: boolean;
  lastSavedSlideDimensions: IDimensions;
  slidesDimension: IDimensions;
  theme: {
    colors: string[];
  };
}

const deviceDimension = {
  width: 1280,
  height: 800
};

const initialAppState: InitialAppState = {
  deviceDimension,
  currentSlide: 0,
  currentSelectedPlugin: null,
  isDragging: false,
  isFullScreen: false,
  lastSavedSlideDimensions: deviceDimension,
  slidesDimension: {
    width: deviceDimension.width * .75,
    height: deviceDimension.height * .75
  },
  theme: {
    colors: ['#ffeb3b', '#0062A3'],
  }
};

const appReducer = (state: any = initialAppState, action: any) => {
  switch (action.type) {
    case constants.ADD_THEME_COLOR: {
      const { color } = action;

      const newState = cloneDeep(state);
      newState.theme.colors.push(color);

      return newState;
    }

    case constants.GO_TO_SLIDE: {
      const { maxSlides, slideNumber } = action;
      if (slideNumber < 1) return Object.assign({}, state, {
        currentSelectedPlugin: null,
        currentSlide: 0,
      });
      if (slideNumber >= maxSlides) return state;
      return Object.assign({}, state, {
        currentSelectedPlugin: null,
        currentSlide: slideNumber,
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

const ignoreActions:any = [constants.TOGGLE_GUIDELINES];
const undoableAppReducer = undoable(appReducer, {
  filter: function filterActions(action: any, currentState: any, previousHistory: any) {
    if (action.type === 'SET_ACTIVE_PLUGIN' || action.type === 'GO_TO_SLIDE') return true;
    return false;
  }
});


export { undoableAppReducer };
