import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@blueprintjs/core';

const actions = require('./actions');


interface ControlPanelProps {
  addSlide?: React.MouseEventHandler<HTMLElement>,
  deleteSlide?: React.MouseEventHandler<HTMLElement>,
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
  dispatch?: Function,
}

class ControlPanelComponent extends React.Component<ControlPanelProps, {}> {
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

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {
    addSlide: () => dispatch(actions.addSlide()),
    deleteSlide: () => dispatch(actions.deleteSlide()),
    toggleFullscreenMode: () => dispatch(actions.toggleFullscreenMode()),
  };
}

const ControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanelComponent as any);

export { ControlPanel };
