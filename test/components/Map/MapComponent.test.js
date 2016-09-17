import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { Map } from 'components/Map/index.js'


describe('<Map />', () => {
  it('should render fine', () => {
    const wrapper = shallow(<Map />)
    expect(wrapper.find(Map)).to.be.ok
  })
})
