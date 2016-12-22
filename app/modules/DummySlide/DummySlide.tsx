import * as React from "react";
import req from 'utils/requireContext';

interface DummySlideProps {
  slide: any;
  slidesDimension?: any;
}

const DummySlide = ({ slide, slidesDimension }: DummySlideProps) => (
  <div>
    {
      slide.plugins.map((plugin: any, key: number) => {
        // When plugin is deleted from plugins array, their position is not
        // removed rather the value is set to null
        if (!plugin) return null;
        
        const { moduleName, state: { width, height, left, top } } = plugin;
        const Plugin = req(moduleName).component;
        
        return (
          <div key={ key } style={{ width, height, position: 'absolute', left, top }}>
            <Plugin
              disabled={ true }
              pluginState={ slide.plugins[key].state } />
          </div>
        );
      })
    }
  </div>
);

export { DummySlide };
