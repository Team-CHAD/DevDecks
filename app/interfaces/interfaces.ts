// Slide Component
// TODO: Rename components to pluginComponents
export interface ISlide {
  // dynamic component types
  components?: any[];
  functions?: Function[];
  index?: number;
}

// Plugins
export interface IPlugin {
  name: string;
  component: React.ComponentClass<{}>;
  icon: string;
  text?: string;
  state: Object;
}

export interface ITextBoxPlugin extends IPlugin {
  value: string;
}

export interface IAppState {
  currentSelectedPlugin: Object;
  currentSlide: number;
  isFullScreen: boolean;
  slides: ISlide[];
}

export interface IAppAction {
  type: string;
  idxOfSlideToDelete?: number;
  isFullScreen?: boolean;
  // Multiple plugin types
  plugin?: any;
  pluginNumber?: number;
  text?: string;
  miniSlideIndex?: number;
  changes?: any;
}
