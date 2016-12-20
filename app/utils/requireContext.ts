// Pre-load all of our plugins so we can dynamically require
// them later. Use req instead of require when trying to
// access those modules.
const req = require.context('../plugins/node_modules', true);

export default function(moduleName: string) {
  return req(`./${moduleName}/index`).default;
}
