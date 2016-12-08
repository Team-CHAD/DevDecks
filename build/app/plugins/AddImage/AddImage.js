"use strict";
const React = require("react");
const core_1 = require("@blueprintjs/core");
const dialog = require('electron').remote.dialog;
const fs = require('fs');
const AddImage = ({ height, width, pluginNumber, pluginState, slideNumber, updateCurrentSlide }) => {
    const options = {
        filters: [
            {
                name: 'Images',
                extensions: ['png', 'gif', 'jpeg', 'jpg']
            }
        ]
    };
    const selectImageFile = () => {
        dialog.showOpenDialog(options, (filePaths) => {
            if (!filePaths)
                return;
            fs.readFile(filePaths[0], (err, data) => {
                if (err)
                    return;
                const imageBufferString = new Buffer(data).toString('base64');
                updateCurrentSlide(pluginNumber, slideNumber, { imageBufferString });
            });
        });
    };
    return (React.createElement("div", null,
        React.createElement(core_1.Button, { iconName: "folder-open", text: "Select Image File", onClick: selectImageFile }),
        pluginState.imageBufferString ?
            React.createElement("img", { width: width, height: height, style: pluginState.imageBufferString ? { display: 'block' } : { display: 'none' }, src: `data:image;base64,${pluginState.imageBufferString}` }) : null));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddImage;
