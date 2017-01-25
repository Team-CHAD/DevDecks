import { expect } from 'chai';
import { ADD_PLUGIN_TO_CURRENT_SLIDE } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  const plugin1 = 'plugin1';

  describe('ADD_PLUGIN_TO_CURRENT_SLIDE', () => {
    it('should add a new plugin to selected slide', () => {
      expect(
        reducer(initialState, {
          type: ADD_PLUGIN_TO_CURRENT_SLIDE,
          plugin: plugin1,
          slideNumber: 0
        })
      ).to.deep.equal([{
          plugins: ['plugin1'],
          state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }]);
    });

    it('should add new plugins to the end of the plugin list', () => {
      const _initialState = [{
          plugins: ['plugin5', 'plugin4'],
          state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }];

      expect(reducer(_initialState, {
        type: ADD_PLUGIN_TO_CURRENT_SLIDE,
        plugin: plugin1,
        slideNumber: 0
      })).to.deep.equal([{
          plugins: ['plugin5', 'plugin4', plugin1],
          state: {
          backgroundColor: { r: 255, g: 255, b: 255, a: 100 },
          transition: {
            right: 'rotate-push-left-move-from-right',
            left: 'rotate-push-right-move-from-left',
          }
        }
      }]);
    });
  });
}
