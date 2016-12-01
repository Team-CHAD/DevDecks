// Slide Component
// TODO: Rename components to pluginComponents
export interface ISlide {
  // dynamic component types
  components?: any[],
  functions?: Function[],
  index?: number,
}

// Plugins
export interface IPlugin {
  name: string,
  component: React.ComponentClass<{}>,
  icon: string,
  text?: string,
}

export interface ITextBoxPlugin extends IPlugin {
  value: string,
}

export interface IAppState {
  currentSlide: number,
  isFullscreen: boolean,
  slides: ISlide[],
}

export interface IAppAction {
  type: string,
  idxOfSlideToDelete?: number,
  isFullscreen?: boolean,
  // Multiple plugin types
  plugin?: any,
  pluginIndex?: number,
  text?: string,
  miniSlideIndex?: number,
}
