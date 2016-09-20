import React from 'react'
const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

import { Input } from './Input/index.js'
import { SubmitButton } from './SubmitButton/index.js'

export const SearchBar = React.createClass({
  getInitialState() {
    return { place: '' }
  },

  updatePlace(place=this.state.place) {
    this.setState({ place })
    return this.props.onChange(place)
  },

  render() {
    return <div className={ CSS.container }>
      <Input updatePlace={ this.updatePlace } mapInstance={ this.props.mapInstance }/>
      <SubmitButton handleSubmit={ this.updatePlace }/>
    </div>
  }
})
