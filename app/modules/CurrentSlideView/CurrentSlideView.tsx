// this file will render the current slide react component

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

interface CurrentSlideProps { currSlide?: number; slides?: any[]; }

class CurrentSlideViewComponent extends React.Component<CurrentSlideProps, {}> {

  render() {
    const { slides, currSlide } = this.props;
    return (
      <div>
        { slides[currSlide].components.map((Plugin: any, key: number) => <Plugin key={key}/>)}
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
