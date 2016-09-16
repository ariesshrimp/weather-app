import React from 'react'
import ReactDOM from 'react-dom'
const gmaps = require('google-maps-api')('AIzaSyDAA7ZvT8YQXSKoFNu9NwvlFeuS4M649QY', ['places'])

import { Root } from './components/root.js'
import BaseStyles from './styles/base.scss'

/** Render statement is wrapped here while we wait for GoogleMaps to
*   initialize.
*/
gmaps().then(map => {
  /** Uncomment this line to inject your mapInstance into the global space.
  *   Seems bad, but all of the net's examples do it, and
  *   We have obscured googlemaps dependencies anyway because
  *   maptile modules are all async and weird.
  */
  // window.gmap = map

  /**
  *   Return the DOM string in order to continue the promise chain if needed
  */
  return ReactDOM.render(<Root mapInstance={ map }/>, document.getElementById('content'))
})
