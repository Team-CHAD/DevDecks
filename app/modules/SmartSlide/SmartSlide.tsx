import * as React from "react";
import { connect } from 'react-redux';
import req from 'utils/requireContext';
import { goToSlide, setActivePlugin, toggleGuidelines } from 'actions/app.actions';
import { updateCurrentPlugin } from 'actions/slides.actions';
import './smart-slide.scss';

const Rnd = require('react-rnd');
const classNames = require('classnames');

interface SmartSlideProps {
  currentSelectedPlugin?: {
    moduleName: string;
    pluginNumber: number;
    slideNumber: number;
  };
  goToSlide?: Function;
  isInPresenterMode?: boolean;
  scale: number;
  setActivePlugin?: Function;
  slide?: any;
  slidesDimension?: {
    width: number;
    height: number;
  };
  slideNumber?: number;
  toggleGuidelines?: Function;
  updateCurrentPlugin?: Function;
}

export class SmartSlideComponent extends React.Component<SmartSlideProps, {}> {
  rnd: any = {};

  // This is to update the position via Rnd updatePosition API
  // Otherwise, there is a bug with slides rendering its position
  // based on the last movement of the last plugin
  // Added functionality to make sure that the current slide changes to the correct slide
  // when undoing actions with the undo functionality 
  public componentDidUpdate({ slideNumber: _slideNumber }: { slideNumber: number }): void {
    const { currentSelectedPlugin, goToSlide, slide, slideNumber } = this.props;
    
    if (slideNumber !== _slideNumber) {
      for (const key in this.rnd) {
        if (!this.rnd[key]) return null;
        const { state: { left: x, top: y } } = this.props.slide.plugins[key];
        this.rnd[key].updatePosition({ x, y });
      }
    }
    if (currentSelectedPlugin === null) return null;
    if (slideNumber !== currentSelectedPlugin.slideNumber) { 
      goToSlide(currentSelectedPlugin.slideNumber);
    }
  }
  public componentWillUpdate({ slideNumber: _slideNumber }: { slideNumber: number }): void {
    const { currentSelectedPlugin, goToSlide, slide, slideNumber } = this.props;
    if (!slide) goToSlide(0);
  }

  public render() {
    const {
      currentSelectedPlugin,
      isInPresenterMode,
      scale,
      setActivePlugin,
      slide,
      slidesDimension,
      slideNumber,
      toggleGuidelines,
      updateCurrentPlugin,
    } = this.props;

    return (
      <div id="current-slide-view ">
        {
          slide.plugins.map((plugin: any, key: number) => {
            // When plugin is deleted from plugins array, their position is not removed rather the value is set to null
            if (!plugin) return null;

            const { moduleName, state } = plugin;
            const Plugin = req(moduleName).component;

            const {
              width,
              height,
              left,
              top,
              
              isResizable,
              forceDynamicHeight,
              lockAspectRatio,
            } = state;

            const className = classNames({
              'editing': (
                currentSelectedPlugin !== null
                  ? currentSelectedPlugin.pluginNumber === key && currentSelectedPlugin.slideNumber === slideNumber
                  : false
              ),
              'force-dynamic-height': forceDynamicHeight,
              'rnd': true,
            });

            return (
              <Rnd
                key={ key }
                ref={ (c: any) => this.rnd[key] = c }
                className={ className }
                lockAspectRatio={ lockAspectRatio }
                initial={{
                  width,
                  height: '100%',
                  x: left,
                  y: top
                }}
                bounds={{
                  top: 0,
                  left: 0,
                  right: (slidesDimension.width / scale) - width,
                  bottom: (slidesDimension.height / scale) - height
                }}
                // Resizing T, L, TR, BL, TL results in unwanted movements
                isResizable={ isResizable ? isResizable : {
                  top: false,
                  right: true,
                  bottom: true,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false
                }}
                moveGrid={[((slidesDimension.width / scale) - width)/100, ((slidesDimension.height / scale) - height)/100]}
                onClick={() => {
                  if (!currentSelectedPlugin) setActivePlugin(plugin.moduleName, key, slideNumber);
                  else {
                    const {
                      pluginNumber: _pluginNumber,
                      slideNumber: _slideNumber
                    } = currentSelectedPlugin;

                    if (_slideNumber !== slideNumber || _pluginNumber !== key) setActivePlugin(plugin.moduleName, key, slideNumber);
                  }
                }}
                onResizeStop={(
                  direction: string,
                  styleSize: Object,
                  clientSize: Object
                ) => updateCurrentPlugin(key, slideNumber, clientSize)}
                onDragStart={toggleGuidelines}
                onDragStop={(e: any, { position }: { position: { left: number; top: number; } }) => {
                  const deltaX = Math.abs((top - position.top) / top);
                  const deltaY = Math.abs((left - position.left) / left);
                  if (deltaX > 0 || deltaY > 0) updateCurrentPlugin(key, slideNumber, position);
                  toggleGuidelines();
                }} >
                <Plugin
                  disabled={ false }
                  pluginState={ state }
                  updateCurrentPlugin={ updateCurrentPlugin.bind(this, key, slideNumber) } />
              </Rnd>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  currentSelectedPlugin: state.app.present.currentSelectedPlugin,
  isInPresenterMode: state.app.present.isInPresenterMode,
  slide: state.slides.present[state.app.present.currentSlide],
  slideNumber: state.app.present.currentSlide,
  slidesDimension: state.app.present.slidesDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
  goToSlide: (slideNumber: number) => dispatch(goToSlide(slideNumber)),
  setActivePlugin: (
    moduleName: string,
    pluginNumber: number,
    slideNumber: number
    ) => dispatch(setActivePlugin(moduleName, pluginNumber, slideNumber)),
  updateCurrentPlugin: (
    pluginNumber: number,
    slideNumber: number,
    changes: Object
  ) => dispatch(updateCurrentPlugin(pluginNumber, slideNumber, changes)),
  toggleGuidelines: () => dispatch(toggleGuidelines()),
});

const SmartSlideConnect = connect(mapStateToProps, mapDispatchToProps)(SmartSlideComponent as any);

export { SmartSlideConnect as SmartSlide };
