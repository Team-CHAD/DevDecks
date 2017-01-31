import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { OPEN_FILE } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  const file = fs.readFileSync(path.join(__dirname, '../test.dd'));
  describe('OPEN_FILE', () => {
    it('should set slide state to the new file', () => {
      const slides = JSON.parse(file.toString());
      expect(reducer(initialState, {
        type: OPEN_FILE,
        buffer_data: file
      })).to.deep.equal(slides);
    });
  });
}
