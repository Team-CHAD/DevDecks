"use strict";
const React = require("react");
const core_1 = require("@blueprintjs/core");
class TextBox extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        };
    }
    updateValue(inputStr) {
        this.setState({ value: inputStr });
    }
    render() {
        return (React.createElement(core_1.EditableText, { multiline: true, onChange: this.updateValue.bind(this), value: this.state.value }));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextBox;
