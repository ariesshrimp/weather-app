import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import TestUtils from 'react-addons-test-utils'
import { findWithType, findWithClass, isComponentOfType } from 'react-shallow-testutils'

import { PrecipitationGraph } from '../src/components/ForecastDisplay/MinuteDataView/index.js'
import { updateForecast, Heading, DetailsMinutely, DetailsHourly, ForecastDisplay } from '../src/components/ForecastDisplay/index.js'
import { getWeatherIcon, convertToCardinal } from '../src/components/ForecastDisplay/utilities.js'

const emptyDefault = {
  city: '',
  timezone: '',
  hourly: {
    summary: '',
    icon: 'default',
    temperature: 0,
    apparentTemperature: 0,
    humidity: 0,
    windSpeed: 0,
    windBearing: 0,
    precipProbability: 0,
    precipIntensity: 0,
    pressure: 0,
    visibility: 0
  },
  minutely: {
    summary: '',
    data: []
  }
}

describe('<ForecastDisplay />', () => {
  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<ForecastDisplay />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('section')
  })

  it('should update state when given new props', () => {
    const node = document.createElement('div')
    let component = ReactServer.renderToString(<ForecastDisplay city={ 'Portland' }/>)
    const before = component.state
    component = ReactDOM.render(<ForecastDisplay location={{ lat: 40.7128 , lng: 74.0059 }} city={'New York'}/>, node)
    const after = component.state
  })

  describe('<Heading />', () => {
    const props = {
      hourly: {summary: '', temperature: 0, icon: 'default'},
      timezone: '',
      city: ''
    }

    it('should render fine', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      const actual = renderer.getRenderOutput()
      expect(actual.type).toEqual('div')
    })

    it('should contain an <Icon />', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      const children = renderer.getRenderOutput().props.children
      const ok = () => findWithClass(component, 'icon')
      expect(ok).not.toThrow();
    })

    it('should not display undefined, null, or NaN', () => {
      const component = ReactServer.renderToString(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      expect(component.search(/(undefined|NaN|null)/)).toEqual(-1)
    })
  })

  describe('<DetailsMinutely />', () => {
    it('should render fine', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<DetailsMinutely />)
      const actual = renderer.getRenderOutput()
      expect(actual.type).toEqual('div')
    })

    it('should not display undefined, null, or NaN', () => {
      const component = ReactServer.renderToString(<DetailsMinutely />)
      expect(component.search(/(undefined|NaN|null)/)).toEqual(-1)
    })

    it('should gracefully handle rendering without props', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<DetailsMinutely />)
      const actual = renderer.getRenderOutput().props.children[0]
      expect(actual.type).toEqual(PrecipitationGraph)
      expect(actual.props.data).toEqual([])
    })

    it('should pass its props down as data to the graph', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<DetailsMinutely minutely={{ data: [1, 2, 3], summary: "ARBITRARY_STRING"}} />)
      const graph = renderer.getRenderOutput().props.children[0]
      const summary = renderer.getRenderOutput().props.children[1]
      expect(graph.props.data).toEqual([1, 2, 3])
      expect(summary.props.children).toContain('ARBITRARY_STRING')
    })
  })

  describe('<HourlyDescription />', () => {
    it('should render fine', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<DetailsHourly hourly={ emptyDefault.hourly }/>)
      const actual = renderer.getRenderOutput()
      expect(actual.type).toEqual('div')
    })

    it('should not display undefined, null, or NaN', () => {
      const component = ReactServer.renderToString(<DetailsHourly hourly={ emptyDefault.hourly }/>)
      expect(component.search(/(undefined|NaN|null)/)).toEqual(-1)
    })

    it('should produce all 7 children from hourly props', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<DetailsHourly hourly={ emptyDefault.hourly }/>)
      const actual = renderer.getRenderOutput().props.children
      expect(actual.length).toEqual(7)
    })
  })

  describe('updateForecast', () => {

  })
})
