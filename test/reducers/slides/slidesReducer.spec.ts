import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { slidesReducer } from '../../../app/reducers';

const files = fs.readdirSync(path.join(__dirname, './actions'));

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

  files.forEach(test => {
    require(`./actions/${test}`).default(initialState, slidesReducer, slide);
  });
});
