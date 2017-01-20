// Issue with Windows 10 pathing so types could not be set in tsconfig.json
// so we need to specify absolute paths
/// <reference path="../node_modules/@types/chai/index.d.ts" />
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

import { jsdom } from 'jsdom';

declare var global: any;

global.document = jsdom('<!doctype html><html><body></body></html>');
