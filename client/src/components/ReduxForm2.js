import React, {Fragment, Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// https://github.com/erikras/redux-form/issues/1037
class CheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  }

  field = ({input, meta, options}) => {
    const {name, onChange} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({label, value}, index) => {

      const handleChange = (event) => {
        const arr = [...inputValue]
        if (event.target.checked) {
          arr.push(value);
        }
        else {
          arr.splice(arr.indexOf(value), 1)
        }
        return onChange(arr)
      }

      const checked = inputValue.includes(value);
      return (
        <label key={`checkbox-${index}`}>
          <input type="checkbox" name={`${name}[${index}]`} value={value} checked={checked} onChange={handleChange}/>
          <span>{label}</span>
        </label>
      )
    })

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }

  render() {
    return <Field
      {...this.props}
      type="checkbox"
      component={this.field}
    />
  }
}

const Checkbox = props => { // eslint-disable-line no-unused-vars
  return (
    <div className="checkbox">
      <input
        {...props.input}
        type="checkbox"
        checked={props.input.value}
      />
      <label>{props.label}</label>
    </div>
  )
}

const Radio = props => {
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label key={`${index}`} htmlFor={`${props.input.name}-${index}`}>
          <Field
            id={`${props.input.name}-${index}`}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
          />
          {key}
        </label>
      )
    };
    return (
      <div className="radio">
        <label>
          {props.label}
        </label>
        <div>
          {props.options &&
          props.options.map(renderRadioButtons)}
        </div>
      </div>
    );
  }
  return <Fragment></Fragment>
}

const Select = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option
        key={`${index}-${key}`}
        value={key}
      >
        {props.options[key]}
      </option>
    )
  }

  if (props && props.options) {
    return (
      <div>
        <label>{props.label}</label>
        <select {...props.input}>
          <option value="">-- location --</option>
          {Object.keys(props.options).map(renderSelectOptions)}
        </select>
      </div>
    )
  }
  return <Fragment></Fragment>
}

const validate = values => {
  const errors = {}
  //TODO:
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderField = props => {
  const {input, label, type, meta:{touched, error}} = props;
  return (
    <div className="input-row">
      <label>{label}</label>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
        ((error && <span>{error}</span>))}
      </div>
    </div>
  )
}

const ReduxForm = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props;
  return (
    <div className="row" style={{marginTop: 40, paddingLeft: 40}}>
      <form onSubmit={handleSubmit}>

        <Field
          name="firstName"
          component={renderField}
          type="text"
          label="First Name"
        />
        <Field
          name="lastName"
          component={renderField}
          type="text"
          label="Last Name"
        />
        <Field
          name="email"
          component={renderField}
          type="email"
          label="Email"
        />
        <Field
          name="password"
          component={renderField}
          type="password"
          label="Password"
        />

        <CheckboxGroup name="team" options={[
          {label: 'Development Team', value: 'Development Team'},
          {label: 'Support_Group', value: 'Support_Group'},
          {label: 'Admin', value: 'Admin'}
        ]}/>

        <Field
          name="role"
          component={Radio}
          label="Role"
          options={[
            'Scrum Master',
            'Project Manager',
            'Business Analyst'
          ]}
        />

        <Field
          name="location"
          component={Select}
          label="Location"
          options={{
            HK: 'HK',
            GZ: 'GZ',
            SZ: 'SZ',
            XA: 'XA',
            Other: 'Other'
          }}
        />

        <div>
          <label htmlFor="comment">Comment</label>
          <div>
            <Field
              name="comment"
              component="textarea"
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Update</button>
          <button type="button" className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Clear
            Values
          </button>
        </div>

      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({initialValues: ownProps.user})

export default connect(mapStateToProps)(reduxForm({
  form: 'user-login-form',
  validate
})(ReduxForm))
