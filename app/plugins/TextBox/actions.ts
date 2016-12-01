import * as constants from '../../modules/App/constants';
// THEY NEED ACCESS TO OUR REDUCER

export function updateTextBoxText(text: string, pluginIndex: number) {
  return {
    type: constants.UPDATE_TEXTBOX_TEXT,
    pluginIndex,
    text,
  }
}

