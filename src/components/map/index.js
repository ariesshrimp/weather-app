import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { LocationField } from '../location-field/index.js'
const geocode = require('google-maps-api/geocode')

export const Map = React.createClass({
  handleGoogleMapLoad(map) {
    // console.log('map loaded')
  },

  render() {
    return <GoogleMapLoader
      containerElement={ <div style={ {height: `50vh`, width: `50vh`} }/> }
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
    if (userLocation) return { location: userLocation }
    else {return {location: {lat: -34.397, lng: 150.644}}}
  },

  componentDidMount() {
    // Ask the user if they want to use their current location
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords
      const location = { lat, lng }

      // Cache it for return visits
      localStorage.setItem('location', JSON.stringify(location))

      // Update the state
      this.setState({
        location
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
        location: loc
      })
    })
  },

  render() {
    return <div>
      <LocationField onChange={ this.handleLocationUpdate }/>
      <Map location={ this.state.location }/>
    </div>
  }
})
