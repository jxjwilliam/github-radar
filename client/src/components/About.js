import React, {Fragment} from 'react'

const About = ({match}) => {
  return (
    <Fragment>
      <h1>About</h1>
      <h2>{match.path}</h2>
    </Fragment>
  )
}

export default About;