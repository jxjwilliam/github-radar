import React, {Fragment} from 'react'

const Contact = ({match}) => {
  return (
    <Fragment>
      <h1>Contact</h1>
      <h2>{match.path}</h2>
    </Fragment>
  )
}

export default Contact;