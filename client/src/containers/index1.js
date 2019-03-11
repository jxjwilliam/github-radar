import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadReposAction, addReposAction, userChangedAction, loadingChangedAction } from '../actions';

class Delegate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      url: 'https://api.github.com/users/',
      repo: {
        name: '',
        stargazers_count: 0,
        open_issues: 0
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    let user = this.input.value.trim();
    this.props.userChangedAction(user);
    this.props.loadReposAction(user);
  }

  componentDidMount () {
    this.props.loadReposAction();
  }

  render () {
    const { github } = this.props;
    let list;
    if (github.repos && github.repos.length > 0) {
      list = github.repos.map((r, i) => (
          <li className="list-group-item" key={ r.id }>
              <div className="row">
                  <div className="col-offset-1 col-md-1"><img src={ r.owner.avatar_url } style={ { height: 50, width: 60 } }/></div>
                  <div className="col-md-10"><h4><a href={ r.html_url }>{r.name}</a></h4>

                      <p>{r.description}</p>
                  </div>
              </div>
          </li>
      ));
    } else if (github.repos && github.repos.length === 0) {
      list = (
          <li className="list-group-item">
              <h3 className="alert alert-danger"> No Repository.</h3>
          </li>
      );
    }

    return (
        <div className="container">
            <h3>Github Repository</h3>

            <div className="row">
                <form onSubmit={ (e) => this.handleSubmit(e) } className="form form-inline row" style={ { marginBottom: 15 } }>
                    <div className="form-group">
                        <input type="text" placeholder="Enter github username" className="form-control"
                          ref={ (input) => this.input = input }/>
                    </div>
                    <button className="btn btn-primary" type="submit">load</button>
            &nbsp;
                    <label>Academind</label>
                </form>
                <div id="loading" className="row alert alert-info hide">
                    <i className="fa fa-spin fa-cog"></i> ...loading github...
                </div>
                <div className="row">
                    <ul className="list-group">{list}</ul>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  github: state.github
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadReposAction,
    addReposAction,
    userChangedAction,
    loadingChangedAction
  }, dispatch);
};

Delegate = connect(
  mapStateToProps,
  mapDispatchToProps
)(Delegate);

export default Delegate;
