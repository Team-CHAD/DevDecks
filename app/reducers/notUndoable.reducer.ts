import { cloneDeep } from '../utils/helpers';
import * as constants from '../constants/notUndoable.constants';

const initialNotUndoableState: any = { isDragging: false };

const notUndoableReducer = (state: any = initialNotUndoableState, action: any) => {
  switch (action.type) {
    case constants.TOGGLE_GUIDELINES: {
      return Object.assign({}, state, { isDragging: !state.isDragging });
    }
    default: { return state };  
  }
}

export { notUndoableReducer };