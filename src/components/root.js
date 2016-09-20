/**
* This file is the real root of the React tree
* You probably don't need to edit this unless you're adding something
* structural to every single "page" of the site
*/
import React from 'react'
const { ControlledMap } = require('./Map/index.js')

import CSS from './styles.scss'

export const Root = props => {
  return <section className={ CSS.column }>
    <ControlledMap mapInstance={ props.mapInstance }/>
  </section>
}
