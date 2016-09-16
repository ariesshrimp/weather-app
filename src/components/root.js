/**
* This file is the real root of the React tree
* You probably don't need to edit this unless you're adding something
* structural to every single "page" of the site
*/
import React from 'react'
import { ControlledMap } from './map/index.js'

import CSS from './styles.scss'

export const Root = React.createClass({
  render() {
    return <section className={ CSS.column }>
      <ControlledMap />
    </section>
  }
})
