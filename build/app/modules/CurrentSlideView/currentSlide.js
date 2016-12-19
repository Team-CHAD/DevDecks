"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
class CurrentSlideComponent extends React.Component {
    render() {
        const { slides, currSlide } = this.props;
        return (React.createElement("div", null, slides[currSlide]));
    }
}
function mapStateToProps(state) {
    return {
        currSlide: state.app.present.currentSlide,
        slides: state.app.present.slides
    };
}
const CurrentSlide = react_redux_1.connect(mapStateToProps)(CurrentSlideComponent);
exports.CurrentSlide = CurrentSlide;
