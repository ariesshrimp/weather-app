'use strict'
import createJSDOM from './helpers/jsdom.js'

if (global && global.document === undefined) {
    createJSDOM();
}

else {
    const mountPoint = document.createElement('div')
    mountPoint.id = 'mount'
    mountPoint.style.display = 'none'
    document.body.appendChild(mountPoint)
}

// XXX:jmf test files should be included in this index
// using `require` rather than `import` thanks to a babel
// bug which renders side-effect only imports in random order
const tests = require.context('./components', true, /test/)
tests.keys().forEach(tests)
