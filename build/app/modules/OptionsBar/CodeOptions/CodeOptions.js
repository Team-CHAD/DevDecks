"use strict";
const React = require("react");
const core_1 = require("@blueprintjs/core");
const brace = require('brace');
const AceEditor = require('react-ace').default;
const CodeLang = ({ pluginState, updateCurrentPlugin }) => {
    const DEFAULT_LANGUAGE = 'JavaScript';
    const languages = ['C++', 'Clojure', 'django', 'Haskell', 'HTML', 'JavaScript', 'JSON', 'Perl', 'PHP', 'Python', 'Ruby', 'TypeScript'];
    const langSelection = (React.createElement(core_1.Menu, null, languages.map((language, key) => (React.createElement(core_1.MenuItem, { key: key, text: language, onClick: () => updateCurrentPlugin({ language: language }) })))));
    return (React.createElement(core_1.Popover, { content: langSelection, position: core_1.Position.RIGHT_TOP },
        React.createElement("button", { className: "pt-button", type: "button" }, pluginState.language ? pluginState.language : DEFAULT_LANGUAGE)));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodeLang;
