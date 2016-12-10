"use strict";
const React = require("react");
const FontSize_1 = require("./FontSize/FontSize");
const CodeLang_1 = require("./CodeOptions/CodeLang");
const CodeTheme_1 = require("./CodeOptions/CodeTheme");
const OptionsBar = ({ currentSelectedPlugin, pluginNumber, pluginState, slideNumber, updateCurrentSlide }) => {
    const shouldBeHidden = currentSelectedPlugin.slideNumber !== slideNumber || currentSelectedPlugin.pluginNumber !== pluginNumber ? true : false;
    return (React.createElement("div", { style: { display: shouldBeHidden ? 'none' : 'initial', position: 'absolute', top: -30, left: 0 } },
        React.createElement(FontSize_1.default, { pluginState: pluginState, updateCurrentPlugin: updateCurrentSlide.bind(this, pluginNumber, slideNumber) }),
        React.createElement(CodeLang_1.default, { pluginState: pluginState, updateCurrentPlugin: updateCurrentSlide.bind(this, pluginNumber, slideNumber) }),
        React.createElement(CodeTheme_1.default, { pluginState: pluginState, updateCurrentPlugin: updateCurrentSlide.bind(this, pluginNumber, slideNumber) })));
};
exports.OptionsBar = OptionsBar;
