import 'babel-polyfill';
import { jsdom } from 'jsdom';

declare var global: any;

global.document = jsdom('<!doctype html><html><body></body></html>');
