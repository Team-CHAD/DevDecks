"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
class CurrentSlideViewComponent extends React.Component {
    render() {
        const { slides, currSlide } = this.props;
        return (React.createElement("div", null, slides[currSlide].components.map((Plugin, key) => React.createElement(Plugin, { key: key }))));
    }
}
function mapStateToProps(state) {
    return {
        currSlide: state.app.currentSlide,
        slides: state.app.slides
    };
}
const CurrentSlideView = react_redux_1.connect(mapStateToProps)(CurrentSlideViewComponent);
exports.CurrentSlideView = CurrentSlideView;
