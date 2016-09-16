import React from 'react'
const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

export const LocationField = React.createClass({
  componentDidMount() {
    const autocomplete = new gmap.places.Autocomplete(this.refs.searchField)
    this.listener = autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace()
    })
  },

  componentWillUnmount() {
    gmaps.event.removeListener(this.listener)
  },

  render() {
    return <form>
      <input ref="searchField" role="search" className={ CSS.searchField }></input>
      <button type="submit" className={ CSS.button } onClick={ event => {
        event.preventDefault()
        this.props.onChange(this.refs.searchField.value)
      }}>submit</button>
    </form>
  }
})
