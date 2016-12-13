import * as React from "react";
import { connect } from 'react-redux';
import { OptionsBar } from 'modules';
import './smart-slide.scss';

const Rnd = require('react-rnd');

interface SmartSlideProps {
  currentSelectedPlugin: any;
  isInPresenterMode: boolean;
  scale: number;
  setActivePlugin: Function;
  slide: any;
  slidesDimension: {
    width: number;
    height: number;
  };
  slideNumber: number;
  updateCurrentSlide: Function;
}

class SmartSlide extends React.Component<SmartSlideProps, {}> {
  rnd: any = {};

  // This is to update the position via Rnd updatePosition API
  // Otherwise, there is a bug with slides rendering its position
  // based on the last movement of the last plugin
  componentDidUpdate({ slideNumber: _slideNumber }: { slideNumber: number }): void {
    const { slide, slideNumber } = this.props;
    if (slideNumber === _slideNumber) return null;
    for (const key in this.rnd) {
      if (!this.rnd[key]) return null;
      const { state: { left: x, top: y } } = this.props.slide.plugins[key];
      this.rnd[key].updatePosition({ x, y });
    }
  }

  render() {
    const { 
      currentSelectedPlugin,
      isInPresenterMode,
      scale,
      setActivePlugin,
      slide,
      slidesDimension,
      slideNumber,
      updateCurrentSlide,
    } = this.props;

    return (
      <div>
        {
          slide.plugins.map((plugin: any, key: number) => {
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
                  const { pluginNumber: _pluginNumber, slideNumber: _slideNumber } = currentSelectedPlugin;
                  if (_slideNumber !== slideNumber || _pluginNumber !== key) setActivePlugin(key, slideNumber);
                }}
                onResizeStop={ (direction: string, styleSize: Object, clientSize: Object) => updateCurrentSlide(key, slideNumber, clientSize) }
                onDragStop={(e: any, { position }: { position: { left: number; top: number; } }) => {
                  const { left, top } = state;
                  const deltaX = Math.abs((top - position.top) / top);
                  const deltaY = Math.abs((left - position.left) / left);
                  if (deltaX > 0 || deltaY > 0) updateCurrentSlide(key, slideNumber, position);
                }} >
                <OptionsBar 
                  currentSelectedPlugin={ currentSelectedPlugin }
                  pluginNumber={ key }
                  pluginState={ state } 
                  slideNumber={ slideNumber } 
                  updateCurrentSlide={ updateCurrentSlide } />
                <Plugin 
                  width={ state.width }
                  height={ state.height }
                  isInPresenterMode={ isInPresenterMode }
                  pluginNumber={ key }
                  pluginState={ state }
                  slideNumber={ slideNumber }
                  updateCurrentSlide={ updateCurrentSlide } />
              </Rnd>
            );
        })}
      </div>
    );
  }
}

export default SmartSlide;
