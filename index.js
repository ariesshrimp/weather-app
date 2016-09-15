import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import { Router, createMemoryHistory, browserHistory } from 'react-router'

import { createMarkup } from './utilities.js'
import { App } from './components/app.js'
import Routes from './components/routes.js'

if (typeof document !== 'undefined') {
  ReactDOM.render(<Router history={ browserHistory }>{ Routes }</Router>, document.getElementById('content'))
}

export default (locals, callback) => {
  const history = createMemoryHistory(locals.path)
  const Template = require('./template.js').default

  const reactApp = createMarkup(
    ReactServer.renderToStaticMarkup(
      <Router history={ history }>{ Routes }</Router>
    ))

  const HTML = ReactServer.renderToStaticMarkup(<Template reactApp={ reactApp } locals={ locals }/>)

  callback(null, `<!DOCTYPE html>${ HTML }`)
}
