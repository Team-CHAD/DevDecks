import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@blueprintjs/core';

const actions = require('./actions');


@connect(
  state => ({
    app: state.app,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)

class ControlPanel extends React.Component<{ addSlide?: React.MouseEventHandler<HTMLElement>, deleteSlide?: React.MouseEventHandler<HTMLElement> }, {}> {
  render() {
    const { addSlide, deleteSlide } = this.props;
    return (
      <div>
        <Button className='pt-large' iconName='add' onClick={ addSlide } />
        <Button className='pt-large' iconName='trash' onClick={ deleteSlide } />
      </div>
    );
  }
}

export { ControlPanel };
