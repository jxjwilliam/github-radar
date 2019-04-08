import React, {Fragment} from 'react'

const Code = ({match}) => {
  return (
    <Fragment>
      <h1>Code</h1>
      <h2>{match.path}</h2>
    </Fragment>
  )
}

export default Code;