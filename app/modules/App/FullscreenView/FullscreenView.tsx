import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './fullscreen-view.scss';

import Controls from './Controls/Controls';

const actions = require('../../ControlPanel/actions');


interface FullscreenViewProps {
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
}

@connect(
  state => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)


class FullscreenView extends React.Component<FullscreenViewProps, {}> {
  render() {
    const { toggleFullscreenMode } = this.props;
    return (
      <div id="fullscreen-view">

        <div className="fullscreen-controls">
          <Controls toggleFullscreenMode={ toggleFullscreenMode }/>
        </div>

        <div>
          Edit Slide View
        </div>

      </div>
    );
  }
}

export default FullscreenView;
