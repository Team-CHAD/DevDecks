import * as React from 'react';
import { connect } from 'react-redux';
import { ControlPanel } from 'modules';
import DeletePlugin from './DeletePlugin/DeletePlugin';
import { setActivePlugin } from 'actions/app.actions';
import { deleteCurrentPlugin, updateCurrentPlugin } from 'actions/slides.actions';
import plugins from 'plugins';
import './utilities-menu.scss';

interface UtilitiesMenuParentProps {
  styles: Object;
}

interface UtilitiesMenuProps extends UtilitiesMenuParentProps {
  moduleName: string;
  pluginNumber: number;
  pluginState: any;
  slideNumber: number;
  deleteCurrentPlugin: Function;
  setActivePlugin: Function;
  updateCurrentPlugin: Function;
}

class UtilitiesMenu extends React.Component<UtilitiesMenuProps, {}> {
  render() {
    const {
      moduleName,
      pluginNumber,
      pluginState,
      slideNumber,
      styles,
      deleteCurrentPlugin,
      setActivePlugin,
      updateCurrentPlugin,
    } = this.props;

    // NOTE: temporary method to handle getting the right plugins.
    // Ultimately, we will be able to just pull from the list of
    // installed packages via npm
    //
    // For future, we will do a dynamic require
    // const PluginOptions = require(...);
    let PluginOptions: any;
    plugins.forEach(({ moduleName: _moduleName, optionsMenuComponent }) => {
      _moduleName === moduleName ? PluginOptions = optionsMenuComponent : null;
    });

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
                  <DeletePlugin
                    deleteCurrentPlugin={ deleteCurrentPlugin.bind(this, pluginNumber, slideNumber) }
                    setActivePlugin={ setActivePlugin } />
                </div>
              : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  const currentSelectedPlugin = state.app.currentSelectedPlugin;

  if (currentSelectedPlugin) {
    var { moduleName, pluginNumber, slideNumber } = currentSelectedPlugin;
    var pluginState = state.slides[slideNumber].plugins[pluginNumber].state;
  }

  return {
    moduleName,
    pluginNumber,
    pluginState,
    slideNumber,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  deleteCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number) => dispatch(deleteCurrentPlugin(pluginNumber, pluginSlideNumber)),
  setActivePlugin: (moduleName: string, pluginNumber: number, slideNumber: number) => dispatch(setActivePlugin(moduleName, pluginNumber, slideNumber)),
  updateCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number, changes: any) => dispatch(updateCurrentPlugin(pluginNumber, pluginSlideNumber, changes))
});

const UtilitiesMenuConnect = connect(mapStateToProps, mapDispatchToProps)(UtilitiesMenu as any);

export { UtilitiesMenuConnect as UtilitiesMenu };
