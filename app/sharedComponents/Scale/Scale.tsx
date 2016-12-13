import * as React from 'react';

interface ScaleProps {
  children?: any;
  isFullScreen: boolean;
  scale: number;
}

const Scale = ({ children, isFullScreen, scale }: ScaleProps) => {
  return (
    <div style={{ transform: `scale(${ scale })`, transformOrigin: !isFullScreen ? '0 0' : null}}>
      { children }
    </div>
  );
};

export { Scale };
