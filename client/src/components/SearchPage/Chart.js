import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ListAction from '../../store/actions';
import Searchbox from '../Search';
import SearchPageNavigator from './SearchPageNavigator';

let CanvasJS = require('../../assets/canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;


export class Chart extends Component {
    state = {
      done: false
    };

    chartRender = () => {
        console.log( this.props.userList );
        const dataPoints = this.props.userList.map((item, index) => {
            return {
                label: item.name,
                y: ( index + 1) * 10
            }
        });

        var chart = new CanvasJS.Chart("chartContainer", {
            title:{
                text: "Popularity"              
            },
            data: [              
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints
            }
            ]
        });
        chart.render();
    }

    handleGlobalSearch = value => {
      this.props.searchUsers(value)
        .then(() => this.setState({ done: true }));
    }

    componentDidMount() {
        this.chartRender();
    }

    componentDidUpdate() {
        this.chartRender();
    }

    render () {

      return (
          <div className="container" style={ { paddingTop: 48 } }>
              <div className="row">
                  <div className="col-md-10">
                      <SearchPageNavigator />
                      <Searchbox onChange={ this.handleGlobalSearch }/>
                  </div>
              </div>
              <div className="row" style={ { paddingTop: 10 } }>
                <div id="chartContainer" 
                    style={ { height: '300px', width: '100%' } }>
                </div>
              </div>
          </div>
      );
    }
}

Chart.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  searchUsers: PropTypes.func.isRequired
};

Chart.defaultProps = {
  userList: [],
  /* eslint-disable no-console */
  searchUsers: () => { console.error('function is not provided'); }
};

const mapStateToProps = (state) => {
  return {
    userList: state.userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListAction, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);
