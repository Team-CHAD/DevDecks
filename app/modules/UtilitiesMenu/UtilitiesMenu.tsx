import * as React from 'react';
import { connect } from 'react-redux';
import { ControlPanel } from 'modules';
import DeletePlugin from './DeletePlugin/DeletePlugin';
import DefaultOptions from './DefaultOptions/DefaultOptions';
import { setActivePlugin } from 'actions/app.actions';
import { deleteCurrentPlugin, updateCurrentPlugin, updateCurrentSlide } from 'actions/slides.actions';
import plugins from 'plugins';
import './utilities-menu.scss';

const availablePlugins: any = {};

plugins.forEach(plugin => {
  availablePlugins[plugin.moduleName] = {
    component: plugin.component,
    optionsMenuComponent: plugin.optionsMenuComponent,
  };
});

interface UtilitiesMenuParentProps {
  styles: Object;
}

interface UtilitiesMenuProps extends UtilitiesMenuParentProps {
  currentSlideNumber: number;
  moduleName: string;
  pluginNumber: number;
  pluginState: any;
  slide: Object;
  slideNumber: number;
  deleteCurrentPlugin: Function;
  setActivePlugin: Function;
  updateCurrentPlugin: Function;
  updateCurrentSlide: Function;
}

class UtilitiesMenu extends React.Component<UtilitiesMenuProps, {}> {
  render() {
    const {
      currentSlideNumber,
      moduleName,
      pluginNumber,
      pluginState,
      slide,
      slideNumber,
      styles,
      deleteCurrentPlugin,
      setActivePlugin,
      updateCurrentPlugin,
      updateCurrentSlide,
    } = this.props;

    // NOTE: temporary method to handle getting the right plugins.
    // Ultimately, we will be able to just pull from the list of
    // installed packages via npm
    //
    // For future, we will do a dynamic require
    // const PluginOptions = require(...);
    let PluginOptions: any;
    if (moduleName && pluginNumber !== undefined || slideNumber !== undefined) {
      PluginOptions = availablePlugins[moduleName].optionsMenuComponent;
    }
    // plugins.forEach(({ moduleName: _moduleName }) => {
    //   _moduleName === moduleName ? PluginOptions = availablePlugins[_moduleName] : null;
    // });

    return (
      <div
        id="utilities-menu-container"
        className="pt-dark"
        style={{ ...styles }}>
        <ControlPanel />
        <div id="options-list">
          {
            PluginOptions
              ? <div>
                  <PluginOptions
                    pluginState={ pluginState }
                    updateCurrentPlugin={ updateCurrentPlugin.bind(this, pluginNumber, slideNumber) } />
                  <hr />
                  <DeletePlugin
                    deleteCurrentPlugin={ deleteCurrentPlugin.bind(this, pluginNumber, slideNumber) }
                    setActivePlugin={ setActivePlugin } />
                </div>
              : <DefaultOptions
                  slide={ slide }
                  updateCurrentSlide={ updateCurrentSlide.bind(this, currentSlideNumber) } />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: UtilitiesMenuParentProps) => {
  const currentSelectedPlugin = state.app.currentSelectedPlugin;
  const { currentSlide: currentSlideNumber } = state.app;

  if (currentSelectedPlugin) {
    var { moduleName, pluginNumber, slideNumber } = currentSelectedPlugin;
    var pluginState = state.slides[slideNumber].plugins[pluginNumber].state;
  }

  return {
    currentSlideNumber,
    moduleName,
    pluginNumber,
    pluginState,
    slide: state.slides[currentSlideNumber],
    slideNumber,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  deleteCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number) => dispatch(deleteCurrentPlugin(pluginNumber, pluginSlideNumber)),
  setActivePlugin: (moduleName: string, pluginNumber: number, slideNumber: number) => dispatch(setActivePlugin(moduleName, pluginNumber, slideNumber)),
  updateCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number, changes: any) => dispatch(updateCurrentPlugin(pluginNumber, pluginSlideNumber, changes)),
  updateCurrentSlide: (slideNumber: number, changes: Object) => dispatch(updateCurrentSlide(slideNumber, changes)),
});

const UtilitiesMenuConnect = connect(mapStateToProps, mapDispatchToProps)(UtilitiesMenu as any);

export { UtilitiesMenuConnect as UtilitiesMenu };
