import React from 'react';

export default class ChatLog {
  render() {
    let msg = this.props.msg;

    return (
      <div className='log'>
        <div>
          {msg.username} {msg.id}
        </div>
        <div>there are {msg.numUsers} participants</div>
      </div>
    );
  }
}
