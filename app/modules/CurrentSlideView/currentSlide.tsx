// this file will render the current slide react component

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';

interface CurrentSlideProps { currSlide?: number; slides?: any[]; }

// @connect(
//   state => ({ slides: state.app.slides, currSlide: state.app.currentSlide }),
  
// ) 
  
class CurrentSlideComponent extends React.Component<CurrentSlideProps, {}> {
  
  render() {
    const { slides, currSlide } = this.props;
    return (
      <div>{slides[currSlide]}</div>
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
const CurrentSlide = connect(
  mapStateToProps
)(CurrentSlideComponent as any);
