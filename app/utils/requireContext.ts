// Pre-load all of our plugins so we can dynamically require
// them later. Use req instead of require when trying to
// access those modules.

// Fix:
// ERROR in ./app/utils/requireContext.ts
// (4,21): error TS2339: Property 'context' does not exist on type 'NodeRequire'.
declare const require: any;

const req = require.context('../plugins/node_modules', true);

export default function(moduleName: string) {
  return req(`./${moduleName}/index`).default;
}
