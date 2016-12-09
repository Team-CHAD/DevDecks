import * as React from "react";
import { connect } from 'react-redux';
import './smart-slide.scss';

const Rnd = require('react-rnd');

import {
  OptionsBar,
} from '../..';

interface SmartSlideProps {
  currentSelectedPlugin: any;
  isInPresenterMode: boolean;
  scale: number;
  setActivePlugin: Function;
  slide: any;
  slideNumber: number;
  updateCurrentSlide: Function;
}

const SmartSlide = ({ 
  currentSelectedPlugin,
  isInPresenterMode,
  scale,
  setActivePlugin,
  slide,
  slideNumber,
  updateCurrentSlide,
}: SmartSlideProps) => (
    <div>
      {
        slide.plugins.map((plugin: any, key: number) => {
          const { component: Plugin, state: { width, height, left, top } } = plugin;
          const pluginState = slide.plugins[key].state;
          return (
            <Rnd
              key={ key }
              className='rnd'
              initial={ {
                width,
                height,
                x: left,
                y: top
              } }
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
                if (_slideNumber !== slideNumber && _pluginNumber !== key) setActivePlugin(key, slideNumber);
              }}
              onResizeStop={ (direction: string, styleSize: Object, clientSize: Object) => updateCurrentSlide(key, slideNumber, clientSize) }
              onDragStop={ (e: any, { position }: { position: { left: number; top: number; } }) => {
                const { left, top } = pluginState;
                const deltaX = Math.abs((top - position.top) / top);
                const deltaY = Math.abs((left - position.left) / left);
                if (deltaX > 0 || deltaY > 0) updateCurrentSlide(key, slideNumber, position);
              } } >
              {
                !isInPresenterMode ?
                  <OptionsBar 
                    currentSelectedPlugin={ currentSelectedPlugin }
                    pluginNumber={ key }
                    pluginState={ pluginState } 
                    slideNumber={ slideNumber } 
                    updateCurrentSlide={ updateCurrentSlide } /> :
                  null
              }
              <Plugin 
                width={ width }
                height={ height }
                currentSlide={ slide }
                pluginNumber={ key }
                pluginState={ pluginState }
                scale={ scale }
                slideNumber={ slideNumber }
                updateCurrentSlide={ updateCurrentSlide } />
            </Rnd>
          );
      })}
    </div>
);

export default SmartSlide;
