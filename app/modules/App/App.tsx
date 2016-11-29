import * as React from 'react';
import { connect } from 'react-redux';
import '@blueprintjs/core/dist/blueprint.css';

import EditView from './EditView/EditView';
import FullscreenView from './FullscreenView/FullscreenView';


@connect(
  state => ({
    isFullscreen: state.app.isFullscreen
  })
)

class App extends React.Component<{ isFullscreen: boolean }, {}> {
  render() {
    const { isFullscreen } = this.props;
    return (
      <main id="container">
        { isFullscreen ? <FullscreenView /> : <EditView /> }
      </main>
    );
  }
}

export { App };
