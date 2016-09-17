import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { ForecastDisplay } from 'components/ForecastDisplay/index.js'
import { PrecipGraph } from 'components/ForecastDisplay/chart.js'


describe('<ForecastDisplay />', () => {
  it('should render a <section />', () => {
    const wrapper = shallow(<ForecastDisplay />)
    const actual = wrapper.find('section')
    expect(actual).to.have.length(1)
  })

  it('does not break if the given location lacks minutely data', () => {
    const wrapper = shallow(<ForecastDisplay />)
    const actual = wrapper.find('.summary').isEmpty()
    expect(actual).to.be.false

    const actual2 = wrapper.find(PrecipGraph)
    expect(actual2).to.have.length(1)
  })

  it('does not break if its given total gibberish', () => {
    const wrapper = shallow(<ForecastDisplay location={ '908088797987NaNnullundefined   ' }/>)
    const actual = wrapper.find(ForecastDisplay).children().length

    const wrapper2 = shallow(<ForecastDisplay />)
    const expected = wrapper2.find(ForecastDisplay).children().length
    expect(actual).to.equal(expected)
  })
})
