"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const MiniSlide_1 = require("./MiniSlide/MiniSlide");
require("./mini-slides-panel.scss");
class MiniSlidesPanelComponent extends React.Component {
    render() {
        const { slides } = this.props;
        return (React.createElement("ul", { className: "mini-slides-panel" }, slides.map((slide, key) => React.createElement(MiniSlide_1.default, { key: key, index: key + 1 }))));
    }
}
function mapStateToProps(state) {
    return {
        slides: state.app.present.slides,
    };
}
const MiniSlidesPanel = react_redux_1.connect(mapStateToProps)(MiniSlidesPanelComponent);
exports.MiniSlidesPanel = MiniSlidesPanel;
