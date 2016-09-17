import JSDOM from 'jsdom'

function createJSDOM() {
    global.document = JSDOM.jsdom('<!doctype html><html><body><div id="mount"></div></body></html>')
    global.window = global.document.defaultView
    global.navigator = global.window.navigator
}

export default createJSDOM
