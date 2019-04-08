import React, {Fragment} from 'react'

const Commit = ({match, location, history}) => {
  return (
    <Fragment>
      <h1>Commit</h1>
      <h2>{location.href}{match.path}</h2>
    </Fragment>
  )
}

export default Commit;