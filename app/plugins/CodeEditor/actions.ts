import * as constants from '../../modules/App/constants';

export function updateCodeEditorCode(codeSnippet: string, pluginNumber: number) {
  return {
    type: constants.UPDATE_CODEEDITOR_CODE,
    codeSnippet,
    pluginNumber
  }
}