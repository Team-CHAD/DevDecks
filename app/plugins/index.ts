// Need a way to dynmically produce this file
// Signature: import { plugin } from { location }

import AceEditor from './CodeEditor/CodeEditor';
import TextBox from './TextBox/TextBox';
import AddImage from './AddImage/AddImage';

// Store last line and export as array?
export default [
  {
    name: 'TextBox',
    component: TextBox,
    icon: 'new-text-box',
  },
  {
    name: 'CodeEditor',
    component: AceEditor,
    icon: 'code'
  },
  {
    name: 'AddImage',
    component: AddImage,
    icon: 'media'
  }
];
