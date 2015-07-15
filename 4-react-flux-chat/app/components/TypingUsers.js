import React, { Component } from 'react';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

const TypingUsers = React.createClass({

  render() {
    let typingUsers = this.props.typingUsers;
    console.log('typing users', typingUsers);

    return (
      <p>{typingUsers.join(', ') + ' typing'}</p>
    );
  }

});

export default TypingUsers;

