import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@blueprintjs/core';

const actions = require('./actions');


interface ControlPanelProps {
  addSlide?: React.MouseEventHandler<HTMLElement>,
  deleteSlide?: React.MouseEventHandler<HTMLElement>,
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
}

@connect(
  state => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)

class ControlPanel extends React.Component<ControlPanelProps, {}> {
  render() {
    const { addSlide, deleteSlide, toggleFullscreenMode } = this.props;
    return (
      <div>
        <Button className='pt-large' iconName='add' onClick={ addSlide } />
        <Button className='pt-large' iconName='trash' onClick={ deleteSlide } />
        <Button className='pt-large' iconName='fullscreen' onClick={ toggleFullscreenMode } />
      </div>
    );
  }
}

export { ControlPanel };
