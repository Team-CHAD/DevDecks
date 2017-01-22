import { expect } from 'chai';
import { DUPLICATE_SLIDE } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  const dummySlide1 = {
    plugins: ['plugin1'],
    state: {
      backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
      transition: {
        right: 'rotate-push-left-move-from-right',
        left: 'rotate-push-right-move-from-left',
      }
    }
  };

  describe('DUPLICATE_SLIDE', () => {
    it('should duplicate slide 0 when slide 0 is selected', () => {
      const _initialState: any = [dummySlide1];
      expect(
        reducer(_initialState, {
          type: DUPLICATE_SLIDE,
          slideToDuplicate: 0
        })
      ).to.deep.equal([dummySlide1, dummySlide1]);
    });

    it('should add the duplicated slide after the selected slide', () => {
      const _initialState: any = [dummySlide1, slide]
      expect(
        reducer(_initialState, {
          type: DUPLICATE_SLIDE,
          slideToDuplicate: 0
        })
      ).to.deep.equal([dummySlide1, dummySlide1, slide]);
    });
  });
}
