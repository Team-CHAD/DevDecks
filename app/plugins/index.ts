// Need a way to dynmically produce this file
// Signature: import { plugin } from { location }

import AceEditor from './CodeEditor/CodeEditor';
import TextBox from './TextBox/TextBox';
import AddImage from './AddImage/AddImage';

// Store last line and export as array?
export default [
  {
    name: 'Text Box',
    component: TextBox,
    icon: 'new-text-box',
    state: {
      value: '',
      width: 300,
      height: 200,
    },
  },
  {
    name: 'Code Editor',
    component: AceEditor,
    icon: 'code',
    state: {
      value: '',
      width: 300,
      height: 200,
    },
  },
  {
    name: 'Image',
    component: AddImage,
    icon: 'media',
  }
];
