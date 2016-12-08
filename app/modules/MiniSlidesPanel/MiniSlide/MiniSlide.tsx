import * as React from 'react';
import './mini-slide.scss';

interface MiniSlideProps {
  goToSlide: any;
  index: number;
  scale: number;
  slide: any;
}

const MiniSlide = ({ goToSlide, index, scale, slide }: MiniSlideProps) => (
  <div onClick={ goToSlide }>
    <span className="mini-slide-counter">{ index }</span>
    <div className="mini-slide">
      { 
        slide.plugins.map((plugin: any, key: number) => {
          const { component: Plugin, state: { width, height, left, top } } = plugin;
          const pluginPosition = {
            left: left ? (left * scale) - 1 : 0,
            top: top ? (top * scale) - 1 : 0
          };
          return (
            <div key={ key } style={{ position: 'absolute', ...pluginPosition }}>
              <div style={{ width, height, transform: `scale(${ scale  })`, transformOrigin: '0 0' }}>
                <Plugin
                  width={ width }
                  height={ height }
                  pluginNumber={ key }
                  pluginState={ slide.plugins[key].state } />
              </div>
            </div>
          );
        })
      }
    </div>
  </div>
);

export default MiniSlide;
