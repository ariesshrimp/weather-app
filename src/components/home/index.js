import React from 'react'
import { ControlledMap } from '../map/index.js'

import CSS from './styles.scss'

export const HomePage = React.createClass({
  render() {
    return <section className={ CSS.column }>
      <ControlledMap />
    </section>
  }
})
