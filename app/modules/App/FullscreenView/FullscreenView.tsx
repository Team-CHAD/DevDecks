import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './fullscreen-view.scss';

import Controls from './Controls/Controls';

const actions = require('../actions');


interface FullscreenViewProps {
  toggleFullscreenMode?: React.MouseEventHandler<HTMLElement>,
}

class FullscreenViewComponent extends React.Component<FullscreenViewProps, {}> {
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

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleFullscreenMode: () => dispatch(actions.toggleFullscreenMode()),
  };
}

const FullscreenView = connect(mapStateToProps, mapDispatchToProps)(FullscreenViewComponent as any);

export default FullscreenView;
