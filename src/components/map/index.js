import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { LocationField } from '../location-field/index.js'
const geocode = require('google-maps-api/geocode')

import DOM from 'can-use-dom'

export const Map = props => {
  const handleGoogleMapLoad = map => {
    // console.log('map loaded')
  }

  const defaultCenter = {lat: -25.363882, lng: 131.044922}

  return <GoogleMapLoader
      containerElement={<div style={ {height: `50vh`, width: `50vh`} }/>}
      googleMapElement={
        <GoogleMap
          ref={ handleGoogleMapLoad }
          defaultZoom={ 5 }
          defaultCenter={ defaultCenter }
          center={ props.location ? props.location : defaultCenter }
        />}
      />
}

export const ControlledMap = React.createClass({
  getInitialState() {
    return {
      location: null
    }
  },

  handleLocationUpdate(location) {
    // console.log(location)
    const newLocation = geocode({
      address: location
    }).then(coordinates => {
      let {lat, lng} = coordinates[0].geometry.location
      let loc = {lat: lat(), lng: lng()}

      this.setState({
        location: loc
      })
    })
  },

  render() {
    // console.log('map control')
    return <div>
      <LocationField onChange={ this.handleLocationUpdate }/>
      <Map location={ this.state.location }/>
    </div>
  }
})
