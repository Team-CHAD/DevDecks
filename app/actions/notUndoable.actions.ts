import * as constants from 'constants/notUndoable.constants';

export function toggleGuidelines() {
  return {
    type: constants.TOGGLE_GUIDELINES,
  };
}