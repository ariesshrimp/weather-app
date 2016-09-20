import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { triggerEvent } from 'react-google-maps/lib/utils'

import { SearchBar } from '../LocationSearchBar/index.js'
import { ForecastDisplay } from '../ForecastDisplay/index.js'

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
    // This doesn't seem to be working as expected...
    // see https://github.com/tomchentw/react-google-maps/issues/337
    // current behavior is...nothing 😖
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
          ref={ map => this.map = map }
          defaultZoom={ 11 }
          defaultCenter={ this.props.location }
          center={ this.props.location }
          >
          <Marker position={ this.props.location }/>
        </GoogleMap>
      } />
  }
})

export const getCurrentLocation = () => {
  const getLocationPromise = () => new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve)
  })
  let location
  return getLocationPromise()
    .then(position => {
      // Renames the coordinate properties for GoogleMaps compatibility
      location = { lat: position.coords.latitude, lng: position.coords.longitude }
      return location
    })
    .then(location => geocode({ location }))
    .then(place => place[0].formatted_address.split(', ').slice(-3)[0])
    .then(cityName => ({ location, cityName }))
}

export const setLocation = (location, city) => {
  localStorage.setItem('location', JSON.stringify(location))
  localStorage.setItem('city', city)
  return { location, city }
}

export const getStoredLocation = fallback => {
  const location = localStorage.getItem('location') || fallback.location
  const city = localStorage.getItem('city') || fallback.city
  return { location: JSON.parse(location), city }
}

export const ControlledMap = React.createClass({
  // This doesn't seem right, but I'm not sure what to use as a default location.
  // Hard to choose something that isn't exclusionary, and all the sensible API's
  // are asynchronous, so it won't work here in getInitialState
  getInitialState() {
    const defaultLocation = {
      location: {lat: -34.397, lng: 150.644},
      city: 'Portland'
    }

    if (!window.localStorage) return defaultLocation
    else return getStoredLocation(defaultLocation)
  },

  componentDidMount() {
    if (!this.state.location && window.navigator) {
      getCurrentLocation()
        .then(location => setLocation(location))
        .then(city => this.setState(location))
    }
  },

  handleLocationUpdate({ location, city }) {
    this.setState({ location, city })
  },

  render() {
    return <div className={ CSS.container }>
      <SearchBar onChange={ this.handleLocationUpdate } mapInstance={ this.props.mapInstance }/>
      <ForecastDisplay location={ this.state.location } city={ this.state.city }/>
      <Map location={ this.state.location }/>
    </div>
  }
})
