import * as React from 'react';

interface ScaleProps {
  children?: any;
  isFullscreen: boolean;
  scale: number;
}

const Scale = ({ children, isFullscreen, scale }: ScaleProps) => {
  return (
    <div style={{ transform: `scale(${ scale })`, transformOrigin: !isFullscreen ? '0 0' : null}}>
      { children }
    </div>
  );
};

export { Scale };
