import React from 'react';
import ChatMessage from './ChatMessage';
import TypingUsers from './TypingUsers';
import ChatLog from './ChatLog';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

export default class ChatPage {
  constructor() {
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  render() {
    let messages = this.props.messages;
    let typingUsers = this.props.typingUsers;
    this.cancelTypingStop;

    return (
      <div>
        <div className='chatArea'>
          <div className='log'>
            <div>Welcome to Socket.IO Chat</div>
            <div>there are {this.props.numUsers} participants</div>
          </div>

          <div className='chatMsg'>
            {messages.map((item, i) => {
              if(item.id === 'joined' || item.id === 'left') {
                return <ChatLog key={i} msg={item} />
              }

              return <ChatMessage key={i} msg={item}/>
            })}
          </div>
        </div>

        <div className='chatBottom'>
          <div className='typing'>
            {!!this.props.typingUsers.length &&
              <TypingUsers typingUsers={typingUsers}/>
            }
          </div>
          <form className='messagesForm' onSubmit={this.handleOnSubmit}>
            <input ref='msg' onChange={this.handleOnChange} />
          </form>
        </div>
      </div>
    );
  }

  handleOnSubmit(e) {
    let msg = React.findDOMNode(this.refs.msg).value;
    AppActions.sendMessage(msg);
    e.preventDefault();
  }

  handleOnChange() {
    if (this.cancelTypingStop) {
      clearTimeout(this.cancelTypingStop);
    }
    this.cancelTypingStop = setTimeout(() => AppActions.userStopTyping(this.props.name), 1500);
    AppActions.userStartTyping(this.props.name);
  }

}
