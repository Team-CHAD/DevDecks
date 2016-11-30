"use strict";
const constants = require("./constants");
function addSlide() {
    return {
        type: constants.ADD_SLIDE,
    };
}
exports.addSlide = addSlide;
function deleteSlide(idxOfSlideToDelete) {
    return {
        type: constants.DELETE_SLIDE,
        idxOfSlideToDelete,
    };
}
exports.deleteSlide = deleteSlide;
function toggleFullscreenMode() {
    return {
        type: constants.TOGGLE_FULLSCREEN_MODE,
    };
}
exports.toggleFullscreenMode = toggleFullscreenMode;
function rightArrowNext() {
    return {
        type: constants.RIGHT_ARROW_NEXT,
    };
}
exports.rightArrowNext = rightArrowNext;
function leftArrowPrev() {
    return {
        type: constants.LEFT_ARROW_PREV,
    };
}
exports.leftArrowPrev = leftArrowPrev;
function addPluginToCurrentSlide(component) {
    return {
        type: constants.ADD_PLUGIN_TO_CURRENT_SLIDE,
        component,
    };
}
exports.addPluginToCurrentSlide = addPluginToCurrentSlide;
