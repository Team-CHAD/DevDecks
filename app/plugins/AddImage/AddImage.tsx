import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

const dialog = require('electron').remote.dialog;
const fs = require('fs');

interface AddImageProps {
  height: number;
  width: number;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const AddImage = ({ height, width, pluginNumber, pluginState, slideNumber, updateCurrentSlide }: AddImageProps) => {
  const options: any = {
    filters: [
      {
        name: 'Images',
        extensions: ['png', 'gif', 'jpeg', 'jpg']
      }
    ]
  };

  const selectImageFile: React.MouseEventHandler<HTMLElement> = () => {
    dialog.showOpenDialog(options, (filePaths: string[]) => {
      if (!filePaths) return;
      fs.readFile(filePaths[0], (err: any, data: any) => {
        if (err) return;
        const imageBufferString: string = new Buffer(data).toString('base64');
        updateCurrentSlide(pluginNumber, slideNumber, { imageBufferString });
      });
    });
  };

  return (
    <div>
      <Button
        iconName="folder-open"
        text="Select Image File"
        onClick={ selectImageFile } />
      {
        pluginState.imageBufferString ?
          <img
            width={width}
            height={height}
            style={pluginState.imageBufferString ? {display: 'block'} : {display: 'none'}}
            src={`data:image;base64,${pluginState.imageBufferString}`}
          /> : null
      }
    </div>
  );
}

export default AddImage;
