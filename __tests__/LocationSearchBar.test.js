import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
const gmaps = require('google-maps-api')('AIzaSyDAA7ZvT8YQXSKoFNu9NwvlFeuS4M649QY', ['places'])

import { SearchBar } from '../src/components/LocationSearchBar/index.js'


describe('<SearchBar />', () => {
  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<SearchBar />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('div')
  })

  it('should correctly pass a map instance to the Autocomplete Input', () => {
    const renderer = TestUtils.createRenderer()

    return gmaps().then(map => {
      const component = renderer.render(<SearchBar mapInstance={ map }/>)
      const actual = renderer.getRenderOutput()
      const input = actual.props.children[0]
      expect(input.props.mapInstance).toEqual(map)
    })
  })

  it('should properly wrap its onChange prop to update state', () => {
    return gmaps().then(map => {
      const component = TestUtils.renderIntoDocument(<SearchBar onChange={ x => x } mapInstance={ map }/>)
      const before = component.state.place

      component.updatePlace('AN_ARBITRARY_STRING')
      const after = component.state.place
      expect(before).not.toEqual(after)
      expect(after).toEqual('AN_ARBITRARY_STRING')
    })
  })

  it('when no props are given, it should default its update function to an empty place', () => {
    return gmaps().then(map => {
      const component = TestUtils.renderIntoDocument(<SearchBar onChange={ x => x } mapInstance={ map }/>)
      const initialState = component.state.place
      component.updatePlace()
      const actual = component.state.place
      expect(actual).toEqual(initialState)
    })
  })
})
