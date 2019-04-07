import React, {Fragment} from 'react';
import {connect} from 'react-redux';

class Trends extends Component {
  render() {
    return (
      <h1>Trends</h1>
    )
  }
}

const mapStateToProps = (state) => ({trends: state.trends})

export default connect(mapStateToProps)(Trends)