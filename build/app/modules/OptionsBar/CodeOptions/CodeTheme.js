"use strict";
const React = require("react");
const core_1 = require("@blueprintjs/core");
const brace = require('brace');
const AceEditor = require('react-ace').default;
const CodeTheme = ({ pluginState, updateCurrentPlugin }) => {
    const DEFAULT_THEME = 'Monokai';
    const themes = ['Ambiance', 'Chaos', 'Chrome', 'Clouds', 'Cobalt', 'Eclipse', 'iPlastic', 'Monokai', 'Textmate', 'Tomorrow', 'Twilight', 'XCode'];
    const themeSelection = (React.createElement(core_1.Menu, null, themes.map((theme, key) => (React.createElement(core_1.MenuItem, { key: key, text: theme, onClick: () => updateCurrentPlugin({ theme: theme }) })))));
    return (React.createElement(core_1.Popover, { content: themeSelection, position: core_1.Position.RIGHT_TOP },
        React.createElement("button", { className: "pt-button", type: "button" }, pluginState.theme ? pluginState.theme : DEFAULT_THEME)));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodeTheme;
