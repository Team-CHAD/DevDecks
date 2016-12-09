import * as React from 'react';
import { connect } from 'react-redux';
import { Menu as ToolBarMenu, MenuItem as ToolBarItem } from '@blueprintjs/core';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { addPluginToCurrentSlide } from '../../actions/slides.actions';
import './toolbar.scss';

// Import from plugins
// Need a way to dynamically update this file based on
// a list of plugins available
import plugins from '../../plugins';

interface ToolBarComponentProps {
  addPluginToCurrentSlide: React.MouseEventHandler<HTMLElement>;
  slideNumber: number;
}

class ToolBarComponent extends React.Component<ToolBarComponentProps, {}> {
  public render() {
    const { addPluginToCurrentSlide, slideNumber } = this.props;
    return (
      <div id="tb">
        <ToolBarMenu className='pt-large tb--menu'>
          {
            // NOTE: Depending on plugin type, it should render different initial states
            plugins.map((plugin: any, key: number) => (
              <Popover content={plugins[key].name}
                interactionKind={PopoverInteractionKind.HOVER}
                // popoverClassName="pt-popover-content-sizing"
                position={Position.BOTTOM_LEFT}
                useSmartPositioning={false}>
                <ToolBarItem
                  key={key}
                  iconName = { plugin.icon }
                  onClick = { addPluginToCurrentSlide.bind(this, {
                    state: { 
                      value: '',
                      width: 300,
                      height: 200,
                    },
                    ...plugin,
                  }, slideNumber )}
                  text = { plugin.text }
                />
              </Popover>
            ))
          }
        </ToolBarMenu>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ slideNumber: state.app.currentSlide });

const mapDispatchToProps = (dispatch: any) => ({
  addPluginToCurrentSlide: (plugin: any, slideNumber: number) => dispatch(addPluginToCurrentSlide(plugin, slideNumber)),
});

const ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent as any);

export { ToolBar };
