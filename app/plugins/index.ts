// Need a way to dynmically produce this file
// Signature: import { plugin } from { location }

import TextBox from './TextBox/TextBox';
// import Link from './Link/Link';

import AceEditor from './CodeEditor/CodeEditor';

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
  }
];
