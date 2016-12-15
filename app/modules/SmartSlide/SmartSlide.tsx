import * as React from "react";
import { connect } from 'react-redux';
import { setActivePlugin } from 'actions/app.actions';
import { updateCurrentPlugin } from 'actions/slides.actions';
import './smart-slide.scss';

const Rnd = require('react-rnd');

interface SmartSlideProps {
  currentSelectedPlugin?: {
    moduleName: string;
    pluginNumber: number;
    slideNumber: number;
  };
  isInPresenterMode?: boolean;
  scale: number;
  setActivePlugin?: Function;
  slide?: any;
  slidesDimension?: {
    width: number;
    height: number;
  };
  slideNumber?: number;
  updateCurrentPlugin?: Function;
}

class SmartSlide extends React.Component<SmartSlideProps, {}> {
  rnd: any = {};

  // This is to update the position via Rnd updatePosition API
  // Otherwise, there is a bug with slides rendering its position
  // based on the last movement of the last plugin
  public componentDidUpdate({ slideNumber: _slideNumber }: { slideNumber: number }): void {
    const { slide, slideNumber } = this.props;
    if (slideNumber === _slideNumber) return null;
    for (const key in this.rnd) {
      if (!this.rnd[key]) return null;
      const { state: { left: x, top: y } } = this.props.slide.plugins[key];
      this.rnd[key].updatePosition({ x, y });
    }
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
      updateCurrentPlugin,
    } = this.props;

    return (
      <div id="current-slide-view ">
        {
          slide.plugins.map((plugin: any, key: number) => {
            //When plugin is deleted from plugins array, their position is not removed rather the value is set to null
            if (!plugin) return null;

            const { component: Plugin, state } = plugin;
            return (
              <Rnd
                key={ key }
                ref={ (c: any) => this.rnd[key] = c }
                className='rnd'
                initial={{
                  width: state.width,
                  height: state.height,
                  x: state.left,
                  y: state.top
                }}
                bounds={{
                  top: 0,
                  left: 0,
                  right: (slidesDimension.width / scale) - state.width,
                  bottom: (slidesDimension.height / scale) - state.height
                }}
                // Resizing T, L, TR, BL, TL results in unwanted movements
                isResizable={{
                  top: false,
                  right: true,
                  bottom: true,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false
                }}
                onClick={() => {
                  if (!currentSelectedPlugin) setActivePlugin(plugin.moduleName, key, slideNumber);
                  else {
                    const {
                      moduleName,
                      pluginNumber: _pluginNumber,
                      slideNumber: _slideNumber
                    } = currentSelectedPlugin;

                    if (_slideNumber !== slideNumber || _pluginNumber !== key) setActivePlugin(moduleName, key, slideNumber);
                  }
                }}
                onResizeStop={(
                  direction: string,
                  styleSize: Object,
                  clientSize: Object
                ) => updateCurrentPlugin(key, slideNumber, clientSize)}
                onDragStop={(e: any, { position }: { position: { left: number; top: number; } }) => {
                  const { left, top } = state;
                  const deltaX = Math.abs((top - position.top) / top);
                  const deltaY = Math.abs((left - position.left) / left);
                  if (deltaX > 0 || deltaY > 0) updateCurrentPlugin(key, slideNumber, position);
                }} >
                <Plugin
                  width={ state.width }
                  height={ state.height }
                  isInPresenterMode={ isInPresenterMode }
                  pluginNumber={ key }
                  pluginState={ state }
                  slideNumber={ slideNumber }
                  updateCurrentPlugin={ updateCurrentPlugin.bind(this, key, slideNumber) } />
              </Rnd>
            );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => ({
  currentSelectedPlugin: state.app.currentSelectedPlugin,
  isInPresenterMode: state.app.isInPresenterMode,
  slide: state.slides[state.app.currentSlide],
  slideNumber: state.app.currentSlide,
  slidesDimension: state.app.slidesDimension,
});

const mapDispatchToProps = (dispatch: any) => ({
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
});

const SmartSlideConnect = connect(mapStateToProps, mapDispatchToProps)(SmartSlide as any);

export { SmartSlideConnect as SmartSlide };
