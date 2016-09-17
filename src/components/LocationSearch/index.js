import React from 'react'
const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

export const LocationField = React.createClass({
  getInitialState() {
    return {place: ''}
  },

  componentDidMount() {
    this.listener = this.onAutocomplete(this.props.mapInstance, this.refs.searchField, this.props.onChange)
  },

  componentWillUnmount() {
    this.mapInstance.removeListener(this.listener)
  },

  handleSubmit() {
    this.props.onChange(this.state.place)
  },

  // Hook an input field into the gMaps places API and allow for callbacks
  // Return the listener for later removal
  onAutocomplete(mapInstance, searchField, callback) {
    const autocomplete = new mapInstance.places.Autocomplete(searchField)
    return autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace()

      // Make sure that there actually is a place first...
      if (place) {
        this.setState({ place: place.formatted_address })
        callback(place.formatted_address)
      }
    })
  },

  render() {
    return <div className={ CSS.container }>
      <input
        ref="searchField"
        role="search"
        className={ CSS.searchField }></input>
      <button
        role="submit"
        className={ CSS.button }
        onClick={ this.handleSubmit }>search</button>
    </div>
  }
})
