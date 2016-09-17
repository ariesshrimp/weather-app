import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { ControlledMap } from 'components/Map/index.js'


describe('<ControlledMap />', () => {
  it('should render fine', () => {
    const wrapper = shallow(<ControlledMap />)
    expect(wrapper.find(ControlledMap)).to.be.ok
  })
})
