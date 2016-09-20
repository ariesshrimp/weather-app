import React from 'react'
const geocode = require('google-maps-api/geocode')

import CSS from '../styles.scss'

export const getNewLocation = location => geocode({ address: location })
  .then(coordinates => {
    let {lat, lng} = coordinates[0].geometry.location
    return {
      location: {lat: lat(), lng: lng()},
      city: coordinates[0].formatted_address.split(', ').slice(-3)[0]
    }
  })

export const Input = React.createClass({
  componentDidMount() {
    this.listener = this.onAutocomplete(this.props.mapInstance, this.searchField, this.props.updatePlace)
  },

  componentWillUnmount() {
    this.props.mapInstance.event.removeListener(this.listener)
    delete this.listener
  },

  // Hook an input field into the gMaps places API and allow for callbacks
  // Return the listener for later removal
  onAutocomplete(mapInstance, searchField, callback) {
    const autocomplete = new mapInstance.places.Autocomplete(searchField)
    return autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace()

      // Make sure that there actually is a place first...
      if (place) {
        return getNewLocation(place.formatted_address)
          .then(result => {
            callback(result)
          })
      }
    })
  },

  render() {
    return <input
      ref={ element => this.searchField = element }
      role="search"
      className={ CSS.searchField }></input>
  }
})
