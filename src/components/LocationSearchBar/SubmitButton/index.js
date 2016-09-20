import React from 'react'
import CSS from '../styles.scss'

export const SubmitButton = props => {
  return <button
    role="submit"
    className={ CSS.button }
    onClick={ props.handleSubmit }>search</button>
}
