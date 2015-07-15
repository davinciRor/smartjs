import React from 'react';
import ChatPage from './ChatPage';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

const LoginPage = React.createClass({

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div>Nick Name</div>
          <input ref='name'/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  },

  handleOnSubmit(e) {
    let name = this.refs.name.getDOMNode().value;
    AppActions.userLogin(name);
    e.preventDefault();
  }

});

export default LoginPage;

