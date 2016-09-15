import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
const gmaps = require('google-maps-api')('AIzaSyDAA7ZvT8YQXSKoFNu9NwvlFeuS4M649QY', ['places'])

import { App } from './components/app.js'
import Routes from './components/routes.js'

import BaseStyles from './styles/base.scss'

gmaps().then(map => {
  window.gmap = map
  ReactDOM.render(<Router history={ browserHistory } >{ Routes }</Router>, document.getElementById('content'))
})
