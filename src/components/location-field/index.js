import React from 'react'
const geocode = require('google-maps-api/geocode')


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
      <input ref="searchField" role="search"></input>
      <button type="submit" onClick={ event => {
        this.props.onChange(this.refs.searchField.value)
        event.preventDefault()
      }}>Submit</button>
    </form>
  }
})
