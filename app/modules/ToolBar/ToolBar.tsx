import * as React from 'react';
import { connect } from 'react-redux';
import {
  Menu as ToolBarMenu,
  MenuItem as ToolBarItem,
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';
import { addPluginToCurrentSlide } from '../../actions/slides.actions';
import './toolbar.scss';

// Import from plugins
// Need a way to dynamically update this file based on
// a list of plugins available
import plugins from '../../plugins';

interface ToolBarComponentProps {
  addPluginToCurrentSlide: React.MouseEventHandler<HTMLElement>;
  slidesDimension: {
    width: number;
    height: number;
  };
  slideNumber: number;
}

class ToolBarComponent extends React.Component<ToolBarComponentProps, {}> {
  public render() {
    const { addPluginToCurrentSlide, slidesDimension, slideNumber } = this.props;
    return (
      <div id="tb">
        <ToolBarMenu className='pt-large tb--menu'>
          {
            // NOTE: Depending on plugin type, it should render different initial states
            plugins.map((plugin: any, key: number) => (
              <Popover 
                key={ key }
                content={ plugins[key].name }
                interactionKind={ PopoverInteractionKind.HOVER }
                position={ Position.BOTTOM_LEFT }
                useSmartPositioning={ false }>
                <ToolBarItem
                  iconName = { plugin.icon }
                  onClick = { addPluginToCurrentSlide.bind(this, {
                    state: { 
                      value: '',
                      width: 300,
                      height: 200,
                      left: slidesDimension.width / 2,
                      top: 100
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

const mapStateToProps = (state: any) => ({
  slidesDimension: state.app.slidesDimension,
  slideNumber: state.app.currentSlide
});

const mapDispatchToProps = (dispatch: any) => ({
  addPluginToCurrentSlide: (plugin: any, slideNumber: number) => dispatch(addPluginToCurrentSlide(plugin, slideNumber)),
});

const ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent as any);

export { ToolBar };
