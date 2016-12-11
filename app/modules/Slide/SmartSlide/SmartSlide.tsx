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

const SmartSlide = ({ 
  currentSelectedPlugin,
  isInPresenterMode,
  scale,
  setActivePlugin,
  slide,
  slidesDimension,
  slideNumber,
  updateCurrentSlide,
}: SmartSlideProps) => (
    <div>
      {
        slide.plugins.map((plugin: any, key: number) => {
          const { component: Plugin, state } = plugin;
          return (
            <Rnd
              key={ key }
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
              isResizable= { isInPresenterMode ? {
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
              } : {
                top: false,
                right: true,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false
              } }
              onClick={() => {
                const { pluginNumber: _pluginNumber, slideNumber: _slideNumber } = currentSelectedPlugin;
                if (_slideNumber !== slideNumber || _pluginNumber !== key) setActivePlugin(key, slideNumber);
              }}
              onResizeStop={ (direction: string, styleSize: Object, clientSize: Object) => updateCurrentSlide(key, slideNumber, clientSize) }
              onDragStop={ (e: any, { position }: { position: { left: number; top: number; } }) => {
                const { left, top } = state;
                const deltaX = Math.abs((top - position.top) / top);
                const deltaY = Math.abs((left - position.left) / left);
                if (deltaX > 0 || deltaY > 0) updateCurrentSlide(key, slideNumber, position);
              } } >
              {
                !isInPresenterMode ?
                  <OptionsBar 
                    currentSelectedPlugin={ currentSelectedPlugin }
                    pluginNumber={ key }
                    pluginState={ state } 
                    slideNumber={ slideNumber } 
                    updateCurrentSlide={ updateCurrentSlide } /> :
                  null
              }
              <Plugin 
                width={ state.width }
                height={ state.height }
                currentSlide={ slide }
                pluginNumber={ key }
                pluginState={ state }
                scale={ scale }
                slideNumber={ slideNumber }
                updateCurrentSlide={ updateCurrentSlide } />
            </Rnd>
          );
      })}
    </div>
);

export default SmartSlide;
