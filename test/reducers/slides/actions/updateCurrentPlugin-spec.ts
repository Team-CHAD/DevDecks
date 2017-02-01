import { expect } from 'chai';
import { UPDATE_CURRENT_PLUGIN } from '../../../../app/constants/slides.constants';

export default function(initialState: any, reducer: any, slide: any) {
  const _initialState = [
    { 
      plugins: [
        { state: {} }
      ]
    }
  ];

  describe('UPDATE_CURRENT_PLUGIN', () => {
    it('should update selected plugin with new change', () => {
      expect(
        reducer(_initialState, {
          type: UPDATE_CURRENT_PLUGIN,
          pluginNumber: 0,
          slideNumber: 0,
          changes: {
            hello: 'world'
          }
        })
      ).to.deep.equal([
        {
          plugins: [
            { 
              state: {
                hello: 'world'
              }
            }
          ],
        }
      ]);
    });

    it('should update selected plugin with multiple changes at once', () => {
      expect(
        reducer(_initialState, {
          type: UPDATE_CURRENT_PLUGIN,
          pluginNumber: 0,
          slideNumber: 0,
          changes: {
            string: 'world',
            boolean: true,
            number: 1,
            undefined: undefined,
            null: null,
            array: [],
            object: {}
          }
        })
      ).to.deep.equal([
        {
          plugins: [
            {
              state: {
                string: 'world',
                boolean: true,
                number: 1,
                undefined: undefined,
                null: null,
                array: [],
                object: {}
              }
            }
          ]
        }
      ]);
    });

    it('should be able to accept functions in its state', () => {
      const nextState: any = reducer(_initialState, {
        type: UPDATE_CURRENT_PLUGIN,
        pluginNumber: 0,
        slideNumber: 0,
        changes: {
          function: () => {}
        }
      });

      expect(nextState[0].plugins[0].state)
        .to.have.property('function')
        .that.is.a('function');
    })
  });
}
