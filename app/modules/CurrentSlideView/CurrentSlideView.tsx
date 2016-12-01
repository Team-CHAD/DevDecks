// this file will render the current slide react component

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

interface CurrentSlideProps { currSlide?: number; slides?: any[]; }

// Line 18: TODO: Dymically produce plugin types
class CurrentSlideViewComponent extends React.Component<CurrentSlideProps, {}> {

  render() {
    const { slides, currSlide } = this.props;
    return (
      <div>
        { 
          slides[currSlide].components.map((plugin: any, key: number) => {
            const { component: Component } = plugin;
            return <Component key={key} slideNumber={currSlide} pluginIndex={key} />;
        })}
      </div>
    )
  }
}


// Map Redux state to component props
function mapStateToProps(state:any) {
  return {
    currSlide: state.app.currentSlide,
    slides: state.app.slides
  }
}

// Connected Component
const CurrentSlideView = connect(
  mapStateToProps
)(CurrentSlideViewComponent as any);

export { CurrentSlideView };
