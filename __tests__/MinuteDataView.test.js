import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import TestUtils from 'react-addons-test-utils'
import { LineChart } from 'react-d3'


import { PrecipitationGraph } from '../src/components/ForecastDisplay/MinuteDataView/index.js'

describe('<PrecipitationGraph />', () => {
  it('should render fine', () => {
    const mockData = []
    mockData.length = 1
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<PrecipitationGraph data={ mockData } />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual(LineChart)
  })

  it('should render nothing when given an empty data set', () => {
    const mockData = []
    mockData.length = 1
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<PrecipitationGraph />)
    const actual = renderer.getRenderOutput()
    expect(actual).toBeNull()
  })
})
