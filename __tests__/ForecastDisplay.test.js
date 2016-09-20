import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import TestUtils from 'react-addons-test-utils'
import { findWithType, findWithClass, isComponentOfType } from 'react-shallow-testutils'


import { updateForecast, Heading, DetailsMinutely, DetailsHourly, ForecastDisplay } from '../src/components/ForecastDisplay/index.js'
import { getWeatherIcon } from '../src/components/ForecastDisplay/utilities.js'

describe('<ForecastDisplay />', () => {
  xit('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<ForecastDisplay />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('section')
  })

  xit('should update state when given new props', () => {
    const node = document.createElement('div')
    let component = ReactServer.renderToString(<ForecastDisplay city={ 'Portland' }/>)
    const before = component.state
    console.log(before)
    component = ReactDOM.render(<ForecastDisplay location={{ lat: 40.7128 , lng: 74.0059 }} city={'New York'}/>, node)
    const after = component.state
    console.log(after)
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

  // TODO:jmf FINISH THE REST OF THE TESTS BELOW ⬇️ (they just have some broken placeholders for now)
  xdescribe('<MinutelyDescription />', () => {
    it('should render fine', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      const actual = renderer.getRenderOutput()
      expect(actual.type).toEqual('div')
    })

    it('should not display undefined, null, or NaN', () => {
      const component = ReactServer.renderToString(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      expect(component.search(/(undefined|NaN|null)/)).toEqual(-1)
    })
  })

  xdescribe('<HourlyDescription />', () => {
    it('should render fine', () => {
      const renderer = TestUtils.createRenderer()
      const component = renderer.render(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      const actual = renderer.getRenderOutput()
      expect(actual.type).toEqual('div')
    })

    it('should not display undefined, null, or NaN', () => {
      const component = ReactServer.renderToString(<Heading hourly={ props.hourly } timezone={ props.timezone } city={ props.city }/>)
      expect(component.search(/(undefined|NaN|null)/)).toEqual(-1)
    })
  })

  xdescribe('updateForecast', () => {

  })
})
