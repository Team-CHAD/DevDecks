import * as React from 'react';
import { Button } from '@blueprintjs/core';


const Controls = ({ toggleFullscreenMode}: { toggleFullscreenMode: React.MouseEventHandler<HTMLElement> }) => (
  <Button className='pt-large' iconName='fullscreen' onClick={ toggleFullscreenMode } />
);

export default Controls;
