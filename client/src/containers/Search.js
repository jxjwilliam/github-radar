import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {searchAction} from '../actions/'
import {getSelector} from '../utils'

class Searchbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      criteria: ''
    }
  }

  render() {

    let placeholder = 'Search ' + this.props.search.placeholder || '...';
    let selector = this.props.search.selectors;
    return (
      <Fragment>
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder={placeholder}
            name="global_search"
            alt="search all data source"
            onChange={this.handleChange}
            ref={input => {
              this.inputRef = input;
            }}
          />
          <div className="input-group-btn">
            <button
              className="btn btn-warning"
              type="button"
              onClick={this.handleClick}
            >
              <i className="fa fa-search-plus"></i>
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  // select Language
  handleSelectChange = e => {
    const val = e.target.value;
    if (val) {
      this.inputRef.value = e.target.value
      this.setState({search: e.target.value})
    }
    else {
      this.inputRef.value = '';
    }
  }

  // select Search Criteria
  handleOptionChange = e => this.setState({criteria: e.target.value});

  // search input box
  handleChange = e => {
    this.setState({search: e.target.value})
  }

  handleClick = e => {
    if (this.state.search) {
      this.props.onChange(this.state);
    }
    else {
      console.log('Please input searching criteria.');
    }
    e.preventDefault();
  }
}

const mapStateToProps = (state) => ({
  search: state.search
})

export default connect(mapStateToProps, {searchAction})(Searchbox);