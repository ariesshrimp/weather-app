import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { ForecastDisplay } from 'components/ForecastDisplay/index.js'


describe('<ForecastDisplay />', () => {
  it('should render a <section />', () => {
    const wrapper = shallow(<ForecastDisplay />)
    const actual = wrapper.find('section')
    expect(actual).to.have.length(1)
  })
})
