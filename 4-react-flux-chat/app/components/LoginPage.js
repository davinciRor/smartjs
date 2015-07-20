import React from 'react';
import ChatPage from './ChatPage';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

export default class LoginPage {
  constructor() {
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  render() {
    return (
      <div className='loginPage'>
        <form className='loginPage__form' onSubmit={this.handleOnSubmit}>
          <h3 className='title'>What is your nickname?</h3>
          <input ref='name' autoFocus/>
        </form>
      </div>
    );
  }

  handleOnSubmit(e) {
    let name = this.refs.name.getDOMNode().value;
    AppActions.userLogin(name);
    e.preventDefault();
  }
}
