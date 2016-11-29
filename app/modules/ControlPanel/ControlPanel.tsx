import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from './Button/Button';

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
        <Button type='+' dispatch={ addSlide } />
        <Button type='-' dispatch={ deleteSlide }/>
      </div>
    );
  }
}

export { ControlPanel };
