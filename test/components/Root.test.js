import { shallow, mount } from 'enzyme'
import React from 'react'
import Sinon from 'sinon'
import chai from 'chai'
const { expect, assert } = chai
chai.should()

import { Root } from 'components/root.js'


describe('<Root />', () => {
  it('should render fine', () => {
    const wrapper = shallow(<Root />)
    expect(wrapper.find(Root)).to.be.ok
  })
})
