import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
const gmaps = require('google-maps-api')('AIzaSyDAA7ZvT8YQXSKoFNu9NwvlFeuS4M649QY', ['places'])


import { Root } from '../src/components/root.js'


xdescribe('<Root />', () => {
  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<Root />)
    const actual = renderer.getRenderOutput()

    expect(actual.type).toEqual('section')
    expect(actual.props.className).toEqual('column')
  })

  it('should pass down a valid google map instance', () => {
    return gmaps().then(map => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<Root mapInstance={ map } />)
      const actual = renderer.getRenderOutput().props.children.props.mapInstance

      expect(actual).toEqual(map)
      expect(renderer.getRenderOutput().props.children.type.displayName).toEqual('ControlledMap')
    })
  })
})
