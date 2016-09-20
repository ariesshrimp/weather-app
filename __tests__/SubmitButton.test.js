import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import TestUtils from 'react-addons-test-utils'

import { SubmitButton } from '../src/components/LocationSearchBar/SubmitButton/index.js'


describe('<SubmitButton />', () => {
  it('should render fine', () => {
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<SubmitButton />)
    const actual = renderer.getRenderOutput()
    expect(actual.type).toEqual('button')
  })

  it('passes prop down on as a submit callback', () => {
    const mockHandler = () => null
    const renderer = TestUtils.createRenderer()
    const component = renderer.render(<SubmitButton handleSubmit={ mockHandler }/>)
    const actual = renderer.getRenderOutput().props.onClick
    expect(actual).toEqual(mockHandler)
  })
})
