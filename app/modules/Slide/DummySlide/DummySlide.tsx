import * as React from "react";

interface DumbSlideProps {
  slide: any;
}

const DumbSlide = ({ slide }: DumbSlideProps) => (
  <div>
    {
      slide.plugins.map((plugin: any, key: number) => {
        const { component: Plugin, state: { width, height, left, top } } = plugin;
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

export default DumbSlide;
