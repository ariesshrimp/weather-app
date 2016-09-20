import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
const gmaps = require('google-maps-api')('AIzaSyDAA7ZvT8YQXSKoFNu9NwvlFeuS4M649QY', ['places'])

import { Input } from '../src/components/LocationSearchBar/Input/index.js'

describe('<Input />', () => {
  let component

  afterEach(() => {
    component = null
    document.innerHTML = ''
  })

  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    component = renderer.render(<Input />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('input')
  })

  it('should bind GoogleMaps autocomplete to the input field', () => {
    return gmaps().then(map => {
      component = TestUtils.renderIntoDocument(<Input mapInstance={ map }/>)
      const actual = Object.keys(component.listener).filter(key => component.listener[key] === 'place_changed')
      expect(actual.length).toEqual(1)
    })
  })

  it('should remove any listeners on dismount', () => {
    return gmaps().then(map => {
      component = TestUtils.renderIntoDocument(<Input mapInstance={ map }/>)
      const before = component.listener
      expect(before).toBeDefined()

      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode)
      const after = component.listener
      expect(after).toBeUndefined()
    })
  })
})
