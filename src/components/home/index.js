import React from 'react'
import { ControlledMap } from '../map/index.js'

export const HomePage = React.createClass({
  render() {
    // console.log('home')
    return <section id="home">
      <h1>Hello!</h1>
      <ControlledMap />
    </section>
  }
})
