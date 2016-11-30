"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const core_1 = require("@blueprintjs/core");
require("./toolbar.scss");
const plugins_1 = require("../../plugins");
const actions = require("../App/actions");
class ToolBarComponent extends React.Component {
    addToCurrentSlide(plugin) {
    }
    render() {
        const { addPluginToCurrentSlide } = this.props;
        return (React.createElement("div", { id: "tb" },
            React.createElement(core_1.Menu, { className: 'pt-large tb--menu' }, plugins_1.default.map((plugin, key) => (React.createElement(core_1.MenuItem, { key: key, iconName: plugin.icon, onClick: addPluginToCurrentSlide.bind(this, plugin.component), text: plugin.text }))))));
    }
}
const mapStateToProps = (state) => { return {}; };
const mapDispatchToProps = (dispatch) => {
    return {
        addPluginToCurrentSlide: (component) => dispatch(actions.addPluginToCurrentSlide(component))
    };
};
const ToolBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent);
exports.ToolBar = ToolBar;
