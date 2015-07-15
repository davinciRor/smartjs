import React, { Component } from 'react';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

const ChatMessage = React.createClass({

  render() {
    let msg = this.props.msg;
    let msgLinks = msg.message.links;
    return (
      <div>
        <div className='messages'>
          <div className="messages__username">{msg.username} :</div>
          <div className="messages__usermessage">{msg.message.text}</div>
          {!!msgLinks && 
            msgLinks.map((link, i) => {
              return <img src={link} />
            })
          }
        </div>
      </div>
    );
  }

});

export default ChatMessage;

