import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { PrecipGraph } from 'components/ForecastDisplay/chart.js'


describe('<PrecipGraph />', () => {
  it('should render a <LineChart />', () => {
    const wrapper = shallow(<PrecipGraph data={ [] }/>)
    expect(wrapper.find(PrecipGraph)).to.be.ok
  })
})
