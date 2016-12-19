import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import { ControlPanel } from 'modules';
import DefaultOptions from './DefaultOptions/DefaultOptions';
import plugins from 'plugins';
import './utilities-menu.scss';

import {
  goToSlide,
  setActivePlugin,
} from 'actions/app.actions';

import {
  addSlide,
  deleteCurrentPlugin,
  deleteSlide,
  moveSlideDown,
  moveSlideUp,
  updateCurrentPlugin,
  updateCurrentSlide
} from 'actions/slides.actions';

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
  maxSlides: number;
  moduleName: string;
  pluginNumber: number;
  pluginState: any;
  slide: Object;
  slideNumber: number;

  addSlide: Function;
  deleteCurrentPlugin: Function;
  deleteSlide: Function;
  goToSlide: Function;
  moveSlideDown: Function;
  moveSlideUp: Function;
  setActivePlugin: Function;
  updateCurrentPlugin: Function;
  updateCurrentSlide: Function;
}

class UtilitiesMenu extends React.Component<UtilitiesMenuProps, {}> {
  render() {
    const {
      currentSlideNumber,
      maxSlides,
      moduleName,
      pluginNumber,
      pluginState,
      slide,
      slideNumber,
      styles,

      addSlide,
      deleteCurrentPlugin,
      deleteSlide,
      goToSlide,
      moveSlideDown,
      moveSlideUp,
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
                  <Button
                    id="delete-button-devdecks"
                    text="Delete Plugin"
                    intent={ Intent.DANGER }
                    onClick={ () => {
                      deleteCurrentPlugin(pluginNumber, slideNumber);
                      setActivePlugin();
                    }} >
                  </Button>
                </div>
              : <div> 
                  <DefaultOptions
                    currentSlideNumber={ currentSlideNumber }
                    maxSlides={ maxSlides }
                    slide={ slide }
                    goToSlide={ goToSlide }
                    moveSlideDown={ moveSlideDown.bind(this, currentSlideNumber) }
                    moveSlideUp={ moveSlideUp.bind(this, currentSlideNumber) }
                    updateCurrentSlide={ updateCurrentSlide.bind(this, currentSlideNumber) } />
                  <hr />
                  <Button
                    style={{ width: '100%' }}
                    text="Delete Slide"
                    intent={ Intent.DANGER }
                    onClick={() => {
                      deleteSlide(currentSlideNumber);
                      setActivePlugin();
                      if (maxSlides - 1 < 1) {
                        addSlide();
                        goToSlide(0);
                      } else if (currentSlideNumber === maxSlides - 1) {
                        goToSlide(currentSlideNumber - 1);
                      } else {
                        goToSlide(currentSlideNumber);
                      }
                    }} />
                </div>
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
    maxSlides: state.slides.length,
    moduleName,
    pluginNumber,
    pluginState,
    slide: state.slides[currentSlideNumber],
    slideNumber,
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  addSlide: (currentSlide: number) => dispatch(addSlide(currentSlide)),
  deleteSlide: (currentSlide: number) => dispatch(deleteSlide(currentSlide)),
  deleteCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number) => dispatch(deleteCurrentPlugin(pluginNumber, pluginSlideNumber)),
  goToSlide: (slideNumber: number, maxSlides: number) => dispatch(goToSlide(slideNumber, maxSlides)),
  moveSlideDown: (slideNumber: number) => dispatch(moveSlideDown(slideNumber)),
  moveSlideUp: (slideNumber: number) => dispatch(moveSlideUp(slideNumber)),
  setActivePlugin: (moduleName: string, pluginNumber: number, slideNumber: number) => dispatch(setActivePlugin(moduleName, pluginNumber, slideNumber)),
  updateCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number, changes: any) => dispatch(updateCurrentPlugin(pluginNumber, pluginSlideNumber, changes)),
  updateCurrentSlide: (slideNumber: number, changes: Object) => dispatch(updateCurrentSlide(slideNumber, changes)),
});

const UtilitiesMenuConnect = connect(mapStateToProps, mapDispatchToProps)(UtilitiesMenu as any);

export { UtilitiesMenuConnect as UtilitiesMenu };
