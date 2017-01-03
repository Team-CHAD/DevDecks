# Creating a Plugin

Your plugin is required like any other node module. We expect an object
with the following properties.

```typescript
{
  component: <ReactComponent>, // React component constructor
  icon: string, // icon name taken from blueprintjs
  moduleName: string, // name registered with npm
  optionsMenuComponent: <ReactComponent>, // React component constructor
  state: Object, // state of your plugin (set default properties here)
  tooltip: string, // text that appears on hovering over icon
}
```

Notes:

- The `icon` value must be one of those from [blueprintjs](http://blueprintjs.com/docs/#icons.ui)
without the 'pt-icon-'.

- Create the `component` and the `optionsMenuComponent` by following the [API Guide](API.md).