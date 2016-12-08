"use strict";
const CodeEditor_1 = require("./CodeEditor/CodeEditor");
const TextBox_1 = require("./TextBox/TextBox");
const AddImage_1 = require("./AddImage/AddImage");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        name: 'TextBox',
        component: TextBox_1.default,
        icon: 'new-text-box',
    },
    {
        name: 'CodeEditor',
        component: CodeEditor_1.default,
        icon: 'code'
    },
    {
        name: 'AddImage',
        component: AddImage_1.default,
        icon: 'media'
    }
];
