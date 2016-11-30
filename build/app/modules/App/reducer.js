"use strict";
const _ = require("lodash");
const constants = require("./constants");
const initialState = {
    currentSlide: 0,
    isFullscreen: false,
    slides: [{ components: [] }],
};
const app = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_SLIDE: {
            const slides = state.slides.slice();
            slides.push({ components: [] });
            return Object.assign({}, state, { slides });
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
            const currentSlide = state.currentSlide + 1;
            console.log('inside right arrow reducer');
            return Object.assign({}, state, { currentSlide });
        }
        case constants.LEFT_ARROW_PREV: {
            const currentSlide = state.currentSlide - 1;
            console.log('inside left arrow reducer');
            return Object.assign({}, state, { currentSlide });
        }
        case constants.ADD_PLUGIN_TO_CURRENT_SLIDE: {
            const slides = _.cloneDeep(state.slides);
            slides[state.currentSlide].components.push(action.component);
            return Object.assign({}, state, { slides });
        }
        default: {
            return state;
        }
    }
};
exports.app = app;
