"use strict";
const React = require("react");
require("./codeEditor.scss");
const brace = require('brace');
const AceEditor = require('react-ace').default;
require('brace/mode/c_cpp');
require('brace/mode/clojure');
require('brace/mode/django');
require('brace/mode/haskell');
require('brace/mode/html');
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/perl');
require('brace/mode/php');
require('brace/mode/python');
require('brace/mode/ruby');
require('brace/mode/typescript');
require('brace/theme/ambiance');
require('brace/theme/chaos');
require('brace/theme/chrome');
require('brace/theme/clouds');
require('brace/theme/cobalt');
require('brace/theme/eclipse');
require('brace/theme/iplastic');
require('brace/theme/monokai');
require('brace/theme/textmate');
require('brace/theme/tomorrow');
require('brace/theme/twilight');
require('brace/theme/xcode');
const CodeEditor = ({ height, width, pluginNumber, pluginState, slideNumber, updateCurrentSlide }) => {
    const DEFAULT_FONT_SIZE = 8;
    const DEFAULT_LANGUAGE = 'javascript';
    const DEFAULT_THEME = 'monokai';
    const { fontSize, language, snippet, snippetEval, theme } = pluginState;
    let setLang;
    if (language === 'C++')
        setLang = 'c_cpp';
    else if (language)
        setLang = language.toLowerCase();
    let setTheme;
    if (theme)
        setTheme = theme.toLowerCase();
    return (React.createElement("div", null,
        React.createElement(AceEditor, { mode: setLang ? setLang : DEFAULT_LANGUAGE, theme: setTheme ? setTheme : DEFAULT_THEME, tabSize: 2, fontSize: fontSize ? DEFAULT_FONT_SIZE * (fontSize / 100) : DEFAULT_FONT_SIZE * 3, height: `${height}px`, width: `${width}px`, onChange: (snippet) => updateCurrentSlide(pluginNumber, slideNumber, { snippet }), value: snippet }),
        React.createElement("button", { className: "runButton", onClick: () => {
                const snippetEval = eval(snippet);
                updateCurrentSlide(pluginNumber, slideNumber, { snippetEval });
            } }, "run code"),
        React.createElement("div", { className: "terminal" }, snippetEval)));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CodeEditor;
