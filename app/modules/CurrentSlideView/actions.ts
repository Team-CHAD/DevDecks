import * as constants from '../../modules/App/constants';


export function setNewActivePlugin(pluginNumber: number, slideNumber: number) {
  return {
    type: constants.SET_NEW_ACTIVE_PLUGIN,
    newActivePlugin: { pluginNumber, slideNumber },
  };
}
