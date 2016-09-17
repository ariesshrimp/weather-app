import chai from 'chai'
const { expect, assert } = chai
chai.should()
import { LocationField } from 'components/LocationSearch/index.js'
import React from 'react'
import { shallow, mount } from 'enzyme'
import Sinon from 'sinon'

describe('<LocationField />', () => {

  it('should render a search field', () => {
    const wrapper = shallow(<LocationField />)
    const actual = wrapper.find('[role="search"]')
    expect(actual).to.have.length(1)
  })

  it('should render a submit button', () => {
    const wrapper = shallow(<LocationField />)
    const actual = wrapper.find('[role="submit"]')
    expect(actual).to.have.length(1)
  })

  describe('<button role="submit">', () => {
    it('should call its given onChange', () => {
      const onChange = Sinon.spy()
      const wrapper = shallow(<LocationField onChange={ onChange }/>)
      wrapper.find('button').simulate('click')
      expect(onChange.calledOnce).to.be.true
    })
  })

  describe('<input role="search">', () => {
    it('should be hooked into autocomplete', () => {
    })

    it('should update state on submission', () => {
    })
  })
})
