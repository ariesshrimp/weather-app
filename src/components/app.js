/**
* This file is the real root of the React tree
* You probably don't need to edit this unless you're adding something
* structural to every single "page" of the site
*/
import React from 'react'

export const App = ({ children }) => {
  const newChildren = React.cloneElement(children)
  return <main>
    { newChildren }
  </main>
}
