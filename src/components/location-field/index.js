import React from 'react'
const geocode = require('google-maps-api/geocode')


export const LocationField = React.createClass({
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
