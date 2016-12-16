// Need a way to dynmically produce this file
// Signature: import { plugin } from { location }

import CodeEditor from './CodeEditor/CodeEditor';
import CodeEditorOptions from './CodeEditor/OptionsMenu';

import Image from './AddImage/AddImage';
import ImageOptions from './AddImage/OptionsMenu';

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
  {
    component: Image,
    icon: 'media',
    moduleName: 'Image',
    // change to tooltip
    name: 'Image',
    optionsMenuComponent: ImageOptions,
    state: {
      value: '',
      width: 300,
      height: 200,
    },
  },
  {
    component: CodeEditor,
    icon: 'code',
    moduleName: 'CodeEditor',
    // change to tooltip
    name: 'CodeEditor',
    optionsMenuComponent: CodeEditorOptions,
    state: {
      value: '',
      width: 800,
      height: 420,
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
