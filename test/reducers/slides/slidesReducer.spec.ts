import { expect } from 'chai';
import { slidesReducer } from '../../../app/reducers';
import addSlideReducerSpec from './specs/addSlide-spec';

const slide: any = {
  plugins: [],
  state: {
    backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
    transition: {
      right: 'rotate-push-left-move-from-right',
      left: 'rotate-push-right-move-from-left',
    }
  }
};

const initialState: any = [slide];

describe('Slides Reducer', () => {
  it('should return the initial state', () => {
    expect(slidesReducer(undefined, {})).to.deep.equal(initialState);
  });
  addSlideReducerSpec(initialState, slidesReducer, slide);
});
