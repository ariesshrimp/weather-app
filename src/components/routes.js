import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App }  from './app.js'
import { HomePage } from './home/index.js'

const Routes = <Route path="/" component={ App }>
  <IndexRoute component={ HomePage } />
</Route>

module.exports = Routes
