import * as constants from '../../modules/App/constants';

export function updateCurrentSlide(pluginNumber: number, changes: Object) {
  return {
    type: constants.UPDATE_CURRENT_SLIDE,
    changes,
    pluginNumber,
  }
}
