import * as React from 'react';
import './mini-slide.scss';

const MiniSlide = ({ index, goToSlide, slide }: { index: number, goToSlide: any, slide: any }) => (
  <div onClick={ goToSlide }>
    <span className="mini-slide-counter">{ index }</span>
    <div className="mini-slide">
      { 
        slide.plugins.map((plugin: any, key: number) => {
          const { component: Plugin, state: { width, height, left: x, top: y } } = plugin;
          return (
            <Plugin
              key={ key }
              width={ 10 }
              height={ 10 }
              pluginNumber={ key }
              pluginState={ slide.plugins[key].state } />
          );
        })
      }
    </div>
  </div>
);

export default MiniSlide;
