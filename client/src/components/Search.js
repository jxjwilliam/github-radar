import React from 'react';
import Languages from '../languages';

class Searchbox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render () {
    return (
        <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              name="global_search"
              alt="search all data source"
              onChange={ this.handleChange }
              ref={ input => {
                this.inputRef = input;
              } }
            />
            <div className="input-group-btn">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={ this.handleClick }
                >
                    <i className="fa fa-search-plus"></i>
                </button>
            </div>

            <select onChange={ this.handleSelectChange }>
                <option value="">--Languages--</option>
                {Languages.map((key, index) => (
                    <option key={ `${index}-${key}` } value={ key }>
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
      this.inputRef.value = e.target.value;
      this.setState({ search: e.target.value });
    } else {
      this.inputRef.value = '';
    }
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  }

  handleClick = e => {
    if (this.state.search) {
      this.props.onChange(this.state.search);
    } else {
      console.log('Please input searching creteria.');
    }
    e.preventDefault();
  }
}

export default Searchbox;
