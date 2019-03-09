import React from 'react'
import {Modal, Button} from "react-bootstrap";
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

/**
 * ${ this.props.className }
 * fade:not(.show) { opacity: 0; }
 * <div role="dialog" tabindex="-1" class="fade show in modal" style="display: block;">
 */
const ModalForm = ({show, close, onUpdate, user}) => (
  <Modal
    show={show}
    className={show ? "show" : ''}
    onHide={close}
  >
    <Modal.Header closeButton>
      <Modal.Title>{user.email ? user.email : 'Add User'}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <ReduxForm onSubmit={onUpdate} user={user}/>
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={close}>Close</Button>
    </Modal.Footer>
  </Modal>
)

let ReduxForm = (props) => {
  const {handleSubmit, user, pristine, reset, submitting} = props;
  return (
    <div className="row" style={{marginTop: 40, paddingLeft: 40}}>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="firstName">First Name</label>
          <div>
            <Field
              className="input"
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
              {/*value={user.firstName}*/}
            />
          </div>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <div>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
              {/*value={user.lastName}*/}
            />
          </div>
        </div>
        { !user.email && (
          <React.Fragment>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                  {/*value={user.email}*/}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <Field
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                  {/*value={user.password}*/}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        <div>
          <label htmlFor="Development_Team">Team</label>
          <div>
            <label>
              <Field
                name="team"
                id="Development_Team"
                component="input"
                type="checkbox"
              />{' '}
              Development Team
            </label>
          </div>
          <div>
            <label htmlFor="Support_Group">Support Group</label>
            <div>
              <label>
                <Field
                  name="team"
                  id="Support_Group"
                  component="input"
                  type="checkbox"
                />{' '}
                Support_Group
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="Admin">Admin</label>
            <div>
              <label>
                <Field
                  name="team"
                  id="Admin"
                  component="input"
                  type="checkbox"
                />{' '}
                Admin
              </label>
            </div>
          </div>
        </div>
        <div>
          <label>Role</label>
          <div>
            <label>
              <Field
                name="role"
                component="input"
                type="radio"
                {/*value="Scrum Master"*/}
              />{' '}
              Scrum Master
            </label>
            <label>
              <Field
                name="role"
                component="input"
                type="radio"
                {/*value="Project Manager"*/}
              />{' '}
              Project Manager
            </label>
            <label>
              <Field
                name="role"
                component="input"
                type="radio"
                {/*value="Business Analyst"*/}
              />{' '}
              Business Analyst
            </label>
          </div>
        </div>
        <div>
          <label>Location</label>
          <div>
            <Field
              name="location"
              component="select"
              {/*value={user.location}*/}
            >
              <option value="select">-- location --</option>
              <option value="HK">HK</option>
              <option value="GZ">GZ</option>
              <option value="XA">XA</option>
              <option value="Other">Other</option>
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <div>
            <Field
              name="comment"
              component="textarea"
              {/*value={user.comment}*/}
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

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.user
  }
}

ReduxForm = connect(mapStateToProps)(reduxForm({
  form: 'add_modify_user'  // an unique identifier for this form
})(ReduxForm))

export default ModalForm