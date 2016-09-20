import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

const { Map, ControlledMap } = require('../src/components/Map/index.js')


xdescribe('<Map />', () => {
  // Not sure this should be tested any further since it's almost entirely vendor code
  it('should correctly set map center and marker position at props.location', () => {
    const renderer = TestUtils.createRenderer()
    const location = {lat: 0, lng: 0}
    const component = renderer.render(<Map location={ location }/>)
    const map = renderer.getRenderOutput().props.googleMapElement
    const marker = map.props.children

    expect(map.props.defaultCenter).toEqual(location)
    expect(map.props.center).toEqual(location)
    expect(marker.props.position).toEqual(location)
  })
})

describe('<ControlledMap />', () => {
  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<ControlledMap />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('div')
  })
})
