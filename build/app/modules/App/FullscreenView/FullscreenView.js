"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
require("./fullscreen-view.scss");
const __1 = require("../..");
const Controls_1 = require("./Controls/Controls");
const actions = require('../actions');
class FullscreenViewComponent extends React.Component {
    constructor() {
        super();
        this.nextPrev = this.nextPrev.bind(this);
    }
    nextPrev(event) {
        if (event.keyCode == 39 && this.props.slides[this.props.currentSlide + 1] !== undefined) {
            console.log('right arrow pressed');
            this.props.rightArrowNext();
        }
        else if (event.keyCode == 37 && this.props.slides[this.props.currentSlide - 1] !== undefined) {
            console.log('left arrow pressed');
            this.props.leftArrowPrev();
        }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.nextPrev);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.nextPrev);
    }
    render() {
        const { toggleFullscreenMode, rightArrowNext, leftArrowPrev } = this.props;
        return (React.createElement("div", { id: "fullscreen-view" },
            React.createElement("div", { className: "fullscreen-controls" },
                React.createElement(Controls_1.default, { toggleFullscreenMode: toggleFullscreenMode })),
            React.createElement("div", null,
                React.createElement(__1.CurrentSlideView, null))));
    }
}
function mapStateToProps(state) {
    return { slides: state.app.slides, currentSlide: state.app.currentSlide };
}
function mapDispatchToProps(dispatch) {
    return {
        toggleFullscreenMode: () => dispatch(actions.toggleFullscreenMode()),
        rightArrowNext: () => dispatch(actions.rightArrowNext()),
        leftArrowPrev: () => dispatch(actions.leftArrowPrev()),
    };
}
const FullscreenView = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FullscreenViewComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FullscreenView;
