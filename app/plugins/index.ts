// Need a way to dynmically produce this file
// Signature: import { plugin } from { location }

import CodeEditor from './CodeEditor/CodeEditor';
import Image from './AddImage/AddImage';

import TextBox from './TextBox/TextBox';
import TextBoxOptions from './TextBox/OptionsMenu';

// Store last line and export as array?
export default [
  {
    component: TextBox,
    icon: 'new-text-box',
    moduleName: 'TextBox',
    // change to tooltip
    name: 'Text Box',
    optionsMenuComponent: TextBoxOptions,
    state: {
      value: '',
      width: 300,
      height: 200,
    },
  },
  // {
  //   moduleName: 'CodeEditor',
  //   name: 'Code Editor',
  //   component: CodeEditor,
  //   icon: 'code',
  //   state: {
  //     value: '',
  //     width: 300,
  //     height: 200,
  //   },
  // },
  // {
  //   moduleName: 'Image',
  //   name: 'Image',
  //   component: Image,
  //   icon: 'media',
  // }
];
