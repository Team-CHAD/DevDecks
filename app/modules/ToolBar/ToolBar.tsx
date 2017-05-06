import * as React from 'react';
import { connect } from 'react-redux';
import req from 'utils/requireContext';
import { addPluginToCurrentSlide } from 'actions/slides.actions';
import './toolbar.scss';

import {
  Intent,
  Menu as ToolBarMenu,
  MenuItem as ToolBarItem,
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

// NOTE: Hard coded for now. This should dynamically get required
// plugins
const installedPlugins = [
  'devdecks-textbox',
  'devdecks-image',
  'devdecks-code-editor',
];

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
      <div id="toolbar" className="s-m-right">
        <ToolBarMenu className='pt-large'>
          {
            installedPlugins.map((installedPlugin: string, key: number) => {
              const plugin = req(installedPlugin);
              const { icon, state, text, tooltip } = plugin;
              return (
                <Popover
                  key={ key }
                  content={ tooltip }
                  interactionKind={ PopoverInteractionKind.HOVER }
                  position={ Position.BOTTOM_LEFT }
                  useSmartPositioning={ false }>
                  <ToolBarItem
                    iconName = { icon }
                    onClick = {
                      addPluginToCurrentSlide.bind(this, {
                        ...plugin,
                        // App default states
                        state: {
                          left: 0,
                          top: 0,
                          // Plugin's default state
                          ...state
                        },
                      }, slideNumber )
                    }
                    text = { text }
                  />
                </Popover>
              );
            })
          }
        </ToolBarMenu>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  slidesDimension: state.app.present.slidesDimension,
  slideNumber: state.app.present.currentSlide
});

const mapDispatchToProps = (dispatch: any) => ({
  addPluginToCurrentSlide: (plugin: any, slideNumber: number) => dispatch(addPluginToCurrentSlide(plugin, slideNumber)),
});

const ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBarComponent as any);

export { ToolBar };
