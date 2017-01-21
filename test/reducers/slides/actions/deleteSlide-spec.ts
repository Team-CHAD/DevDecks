import { expect } from 'chai';
import { DELETE_SLIDE } from '../../../../app/constants/slides.constants';

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

  describe('DELETE_SLIDE', () => {
    const _initialState: any = [slide, dummySlide1];
    it('should delete Slide 0 when the first slide is selected', () => {
      expect(
        reducer(_initialState, {
          type: DELETE_SLIDE,
          slideToDelete: 0
        })
      )
      .to.deep.equal([dummySlide1])
      .and.to.have.lengthOf(1)
    });

    it('should delete Slide 1 when the second slide is selected', () => {
      expect(
        reducer(_initialState, {
          type: DELETE_SLIDE,
          slideToDelete: 1
        })
      )
      .to.deep.equal([slide])
      .and.to.have.lengthOf(1)
    });

    it('should delete only one slide when there are multiple slides', () => {
      const _initialState = [slide, slide, slide];
      expect(
        reducer(_initialState, {
          type: DELETE_SLIDE,
          slideToDelete: 1
        })
      )
      .to.deep.equal([slide, slide])
      .and.to.have.lengthOf(2)
    });
  });
}
