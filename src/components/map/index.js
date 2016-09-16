import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { LocationField } from '../location-field/index.js'
import { ForecastDisplay } from '../forecast-display/index.js'

const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

export const Map = React.createClass({
  handleGoogleMapLoad(map) {
    // console.log('map loaded')
  },

  render() {
    return <GoogleMapLoader
      containerElement={ <div style={ {height: `50vh`, width: `100%`} }/> }
      googleMapElement={
        <GoogleMap
          ref={ this.handleGoogleMapLoad }
          defaultZoom={ 11 }
          defaultCenter={ this.props.location }
          center={ this.props.location }
        />}
      />
  }
})

export const ControlledMap = React.createClass({
  // This doesn't seem right, but I'm not sure what to use as a default location.
  // Hard to choose something that isn't exclusionary, and all the sensible API's
  // are asynchronous, so it won't work here in getInitialState
  getInitialState() {
    const userLocation = JSON.parse(localStorage.getItem('location') )
    const userCity = localStorage.getItem('city')

    if (userLocation && userCity) return { location: userLocation, city: userCity }
    else if (userLocation) return { location: userLocation, city: '' }
    else {
      return {
        location: {lat: -34.397, lng: 150.644},
        city: 'Portland'
      }
    }
  },

  componentDidMount() {
    // Ask the user if they want to use their current location
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords
      const location = { lat, lng }
      geocode({
        location
      }).then(place => {
        const city = place[0].formatted_address.split(', ').slice(-3)[0]

        // Cache it for return visits
        localStorage.setItem('location', JSON.stringify(location))
        localStorage.setItem('city', city)

        // Update the state
        this.setState({
          location,
          city
        })
      })
    })
  },

  handleLocationUpdate(location) {
    // Use the gmaps geocode API to interpret the user's input
    const newLocation = geocode({
      address: location
    }).then(coordinates => {
      let {lat, lng} = coordinates[0].geometry.location
      let loc = {lat: lat(), lng: lng()}

      // Update the state
      this.setState({
        location: loc,
        city: coordinates[0].formatted_address
      })
    })
  },

  render() {
    return <div className={ CSS.container }>
      <LocationField onChange={ this.handleLocationUpdate }/>
      <ForecastDisplay location={ this.state.location } city={ this.state.city }/>
      <Map location={ this.state.location }/>
    </div>
  }
})
