import React from 'react';

export default class TypingUsers {
  render() {
    let typingUsers = this.props.typingUsers;

    return (
      <p>{typingUsers.join(', ') + ' typing'}</p>
    );
  }
}

