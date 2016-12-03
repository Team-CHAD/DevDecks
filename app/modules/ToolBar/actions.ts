import * as constants from '../App/constants';

// TODO: need to dynamically check types of plugin
export function addPluginToCurrentSlide(plugin: any) {
  return {
    type: constants.ADD_PLUGIN_TO_CURRENT_SLIDE,
    plugin,
  };
}