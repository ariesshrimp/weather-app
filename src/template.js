/**
* This file determines the overall structure of the base HTML for any page.
* For example, set the <head> here, append necessary <link>'s for CSS
* or <script>'s for JS, set up meta information, change the mount point for your app, etc
*/

import React from 'react'

import { createMarkup } from './utilities.js'
import { Head } from './components/head/index.js'

export default props => {
  return <html lang="en">
    <Head />
    <body>
        <main id="content" dangerouslySetInnerHTML={ props.reactApp } ></main>
        <script src="/index.js"></script>
    </body>
  </html>
}
