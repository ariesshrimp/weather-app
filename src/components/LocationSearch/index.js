import React from 'react'
const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

// Hook an input field into the gMaps places API and allow for callbacks
// Return the listener for later removal
export const onAutocomplete = (mapInstance, searchField, callback) => {
  const autocomplete = new mapInstance.places.Autocomplete(searchField)
  return autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace()

    // Make sure that there actually is a place first...
    if (typeof place === 'string'){
      callback(place.formatted_address)
    }
  })
}


export const LocationField = React.createClass({
  componentDidMount() {
    this.listener = onAutocomplete(this.props.mapInstance, this.refs.searchField, this.props.onChange)
  },

  componentWillUnmount() {
    this.mapInstance.removeListener(this.listener)
  },

  handleSubmit(event) {
    event.preventDefault()
    this.props.onChange(this.refs.searchField.value)
  },

  render() {
    return <form>
      <input
        ref="searchField"
        role="search"
        className={ CSS.searchField }></input>
      <button
        type="submit"
        className={ CSS.button }
        onClick={ this.handleSubmit }>search</button>
    </form>
  }
})
