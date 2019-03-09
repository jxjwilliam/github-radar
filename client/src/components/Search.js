import React from 'react';
import debounce from 'lodash.debounce';
import {Form} from 'react-bootstrap'
import Languages from '../languages'

//https://reactjs.org/docs/faq-functions.html#debounce
class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          name="global_search"
          alt="search all data source"
          onChange={this.handleChange}
          ref={input => {
            this.inputRef = input;
          }}
        />
        <div className="input-group-btn">
          <button className="btn btn-warning" type="button">
            <i className="fa fa-search-plus"></i>
          </button>
        </div>

        <select onChange={this.handleSelectChange}>
          <option value="">--Languages--</option>
          {Languages.map((key, index) => (
            <option key={`${index}-${key}`} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleSelectChange = e => {
    const val = e.target.value;
    if (val) {
      this.inputRef.value = e.target.value
    }
    else {
      this.inputRef.value = '';
    }
  }

  handleChange(e) {
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}

export default Searchbox;