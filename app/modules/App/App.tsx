import * as React from 'react';
import { connect } from 'react-redux';
import '@blueprintjs/core/dist/blueprint.css';

import EditView from './EditView/EditView';
import FullscreenView from './FullscreenView/FullscreenView';


class AppComponent extends React.Component<{ isFullscreen: boolean }, {}> {
  render() {
    const { isFullscreen } = this.props;
    return (
      <main id="container">
        { isFullscreen ? <FullscreenView /> : <EditView /> }
      </main>
    );
  }
}

const mapStateToProps= (state: any) => ({
  isFullscreen: state.app.isFullscreen,
});

const App = connect(mapStateToProps)(AppComponent as any);

export { App };
