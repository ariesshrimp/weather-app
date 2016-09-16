import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { triggerEvent } from 'react-google-maps/lib/utils'

import { LocationField } from '../location-field/index.js'
import { ForecastDisplay } from '../forecast-display/index.js'

const geocode = require('google-maps-api/geocode')

import CSS from './styles.scss'

export const Map = React.createClass({
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  handleWindowResize(event) {
    // doesn't seem to be working as expected...
    // see https://github.com/tomchentw/react-google-maps/issues/337
    triggerEvent(this.map, 'resize')
  },

  handleGoogleMapLoad(map) {
    this.map = map
    return this.map
  },

  render() {
    return <GoogleMapLoader
      containerElement={ <div className={ CSS.mapContainer }/> }
      googleMapElement={
        <GoogleMap
          ref={ this.handleGoogleMapLoad }
          defaultZoom={ 11 }
          defaultCenter={ this.props.location }
          center={ this.props.location }
          >
          <Marker position={ this.props.location }/>
        </GoogleMap>
      } />
  }
})

export const ControlledMap = React.createClass({
  // This doesn't seem right, but I'm not sure what to use as a default location.
  // Hard to choose something that isn't exclusionary, and all the sensible API's
  // are asynchronous, so it won't work here in getInitialState
  getInitialState() {
    const userLocation = JSON.parse(localStorage.getItem('location') )
    const userCity = localStorage.getItem('city')

    if (userLocation && userCity) {
      return { location: userLocation, city: userCity }
    }
    else if (userLocation) {
      return { location: userLocation, city: '' }
    }
    else {
      return {
        location: {lat: -34.397, lng: 150.644},
        city: 'Portland'
      }
    }
  },

  componentDidMount() {
    // Don't make them wait around forever if we've cached it already
    if (!this.state.location) {
      // Ask the user if they want to use their current location
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude: lat, longitude: lng } = position.coords
        const location = { lat, lng }
        geocode({
          location
        }).then(place => {
          // Arbitrary string manipulation from the gmaps API response
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
    }

    else {
      console.log('not fetching')
    }
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
