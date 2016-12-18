import * as React from "react";
import plugins from 'plugins';

interface DummySlideProps {
  slide: any;
  slidesDimension?: any;
}

const availablePlugins: any = {};

plugins.forEach(plugin => {
  availablePlugins[plugin.moduleName] = {
    component: plugin.component,
    optionsMenuComponent: plugin.optionsMenuComponent,
  };
});

const DummySlide = ({ slide, slidesDimension }: DummySlideProps) => (
  <div>
    {
      slide.plugins.map((plugin: any, key: number) => {
        //When plugin is deleted from plugins array, their position is not removed rather the value is set to null
        if (!plugin) return null;
        
        const { moduleName, state: { width, height, left, top } } = plugin;
        const Plugin = availablePlugins[moduleName].component;
        return (
          <div key={ key } style={{ width, height, position: 'absolute', left, top }}>
            <Plugin
              width={ width }
              height={ height }
              pluginNumber={ key }
              pluginState={ slide.plugins[key].state } />
          </div>
        );
      })
    }
  </div>
);

export { DummySlide };
