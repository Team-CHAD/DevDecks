import * as React from 'react';
import { connect } from 'react-redux';
import req from 'utils/requireContext';
import { Button, Intent } from '@blueprintjs/core';
import { ControlPanel } from 'modules';
import DefaultOptions from './DefaultOptions/DefaultOptions';
import './utilities-menu.scss';

import {
  addThemeColor,
  goToSlide,
  setActivePlugin,
} from 'actions/app.actions';

import {
  addSlide,
  deleteCurrentPlugin,
  deleteSlide,
  duplicateSlide,
  moveSlideDown,
  moveSlideUp,
  updateCurrentPlugin,
  updateCurrentSlide
} from 'actions/slides.actions';

interface UtilitiesMenuParentProps {
  styles: Object;
}

interface UtilitiesMenuProps extends UtilitiesMenuParentProps {
  currentSlideNumber: number;
  maxSlides: number;
  moduleName: string;
  pluginNumber: number;
  pluginState: Object;
  slide: Object;
  slideNumber: number;
  theme: any;

  addThemeColor: Function;
  addSlide: Function;
  deleteCurrentPlugin: Function;
  deleteSlide: Function;
  duplicateSlide: Function;
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
      theme,

      addThemeColor,
      addSlide,
      deleteCurrentPlugin,
      deleteSlide,
      duplicateSlide,
      goToSlide,
      moveSlideDown,
      moveSlideUp,
      setActivePlugin,
      updateCurrentPlugin,
      updateCurrentSlide,
    } = this.props;

    let PluginOptions: any;
    if (moduleName && pluginNumber !== undefined && slideNumber !== undefined) {
      PluginOptions = req(moduleName).optionsMenuComponent;
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
                    theme={ theme }
                    addThemeColor={ addThemeColor }
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
                    theme={ theme }

                    addThemeColor={ addThemeColor }
                    duplicateSlide={ duplicateSlide }
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
  const currentSelectedPlugin = state.app.present.currentSelectedPlugin;
  const { currentSlide: currentSlideNumber } = state.app.present;

  if (currentSelectedPlugin) {
    var { moduleName, pluginNumber, slideNumber } = currentSelectedPlugin;
    var pluginState = state.slides.present[slideNumber].plugins[pluginNumber].state;
  }

  return {
    currentSlideNumber,
    moduleName,
    pluginNumber,
    pluginState,
    slideNumber,
    maxSlides: state.slides.present.length,
    slide: state.slides.present[currentSlideNumber],
    theme: state.app.present.theme,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  addThemeColor: (color: string) => dispatch(addThemeColor(color)),
  addSlide: (currentSlide: number) => dispatch(addSlide(currentSlide)),
  deleteSlide: (currentSlide: number) => dispatch(deleteSlide(currentSlide)),
  deleteCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number) => dispatch(deleteCurrentPlugin(pluginNumber, pluginSlideNumber)),
  duplicateSlide: (slideToDuplicate: number) => dispatch(duplicateSlide(slideToDuplicate)),
  goToSlide: (slideNumber: number, maxSlides: number) => dispatch(goToSlide(slideNumber, maxSlides)),
  moveSlideDown: (slideNumber: number) => dispatch(moveSlideDown(slideNumber)),
  moveSlideUp: (slideNumber: number) => dispatch(moveSlideUp(slideNumber)),
  setActivePlugin: () => dispatch(setActivePlugin()),
  updateCurrentPlugin: (pluginNumber: number, pluginSlideNumber: number, changes: any) => dispatch(updateCurrentPlugin(pluginNumber, pluginSlideNumber, changes)),
  updateCurrentSlide: (slideNumber: number, changes: Object) => dispatch(updateCurrentSlide(slideNumber, changes)),
});

const UtilitiesMenuConnect = connect(mapStateToProps, mapDispatchToProps)(UtilitiesMenu as any);

export { UtilitiesMenuConnect as UtilitiesMenu };
