# Example: Creating an Image Plugin
We recommend using something like babel to make your development easier!

### index.js

```javascript
import Image from './Image';
import ImageOptions from './ImageOptions';

export default {
  component: Image,
  icon: 'media',
  moduleName: 'devdecks-image',
  tooltip: 'Image',
  optionsMenuComponent: ImageOptions,
  state: {
    height: 200,
    imageBufferString: '',
    lockAspectRatio: true,
  },
};
```

### Image.jsx

```javascript
import React from 'react';

// Utilize Node's APIs too!
import fs from 'fs';

// Freely use any of Electron's API with your plugin!
import { remote } from 'electron';

// Options for Electron's dialog API
const options = {
  filters: [
    {
      name: 'Images',
      extensions: [ 'jpeg', 'jpg', 'gif', 'png' ]
    }
  ]
};

const Image = ({ pluginState, updateCurrentPlugin }) => {
  // Prompt user to select an image from their file system
  const selectImageFile = () => {
    remote.dialog.showOpenDialog(options, filePaths => {
      if (!filePaths) return;
      fs.readFile(filePaths[0], (err, data) => {
        if (err) return;
        const imageBufferString = new Buffer(data).toString('base64');
        updateCurrentPlugin({ imageBufferString });
      });
    });
  };

  const { width, imageBufferString } = pluginState;

  return (
    {
      imageBufferString
        ? <img
            max="100%"
            width={width}
            draggable={false}
            src={`data:image;base64,${imageBufferString}`} />
        : <span
            className="pt-icon pt-icon-media"
            style={{ fontSize: 300, opacity: 0.4 }}
            onDoubleClick={selectImageFile} />
    }
  );
}

export default Image;
```

### ImageOptions.jsx

```javascript
import React from 'react';
import fs from 'fs';
import { remote } from 'electron';

// Feel free to use any libraries you want!
// We're basing our UI from blueprintjs
import { Button } from '@blueprintjs/core';

// Got styles? Import your stylesheets
import './devdecks-image.scss';

const options = {
  filters: [
    {
      name: 'Images',
      extensions: [ 'jpeg', 'jpg', 'gif', 'png' ]
    }
  ]
};

const ImageOptions = ({ updateCurrentPlugin }) => {
  // Prompt user to select an image from their file system  
  const selectImageFile = () => {
    remote.dialog.showOpenDialog(options, filePaths => {
      if (!filePaths) return;
      fs.readFile(filePaths[0], (err, data) => {
        if (err) return;
        const imageBufferString = new Buffer(data).toString('base64');
        updateCurrentPlugin({ imageBufferString });
      });
    });
  };

  return (
    <div id="devdecks-image-options-container">
      <h4>Image Options</h4>
      <hr />
      <Button
        id="add-image-button"
        onClick={selectImageFile}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageOptions;
```

### devdecks-image.scss
```scss
#devdecks-image-options-container {
  #add-image-button {
    width: 100%;
  }
}
```