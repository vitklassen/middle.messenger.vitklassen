import { JSDOM } from 'jsdom';
/* eslint-disable */
const jsdom = new JSDOM('<body></body>', {
url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.HTMLElement = jsdom.window.HTMLElement;
global.MouseEvent = jsdom.window.MouseEvent;
