import * as React from 'react';
import { connect } from 'react-redux';
import { addPluginToCurrentSlide } from 'actions/slides.actions';
import plugins from 'plugins';
import './toolbar.scss';

import {
  Menu as ToolBarMenu,
  MenuItem as ToolBarItem,
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

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
      <div id="toolbar">
        <ToolBarMenu className='pt-large'>
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
                  onClick = { 
                    addPluginToCurrentSlide.bind(this, {
                      ...plugin,
                      // App default states
                      state: {
                        left: 250,
                        top: 150,
                        // Plugin's default state
                        ...plugin.state
                      },
                    }, slideNumber )
                  }
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
