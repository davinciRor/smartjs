import React from 'react';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';
import ChatMessage from './ChatMessage';
import TypingUsers from './TypingUsers';

const ChatPage = React.createClass({

  render() {
    let msgs = this.props.messages;
    let typingUsers = this.props.typingUsers;
    this.cancelTypingStop;

    return (
      <div>
        {msgs.map((item, i) => {
          return <ChatMessage key={i} msg={item}/>
        })}

        {!!this.props.typingUsers.length &&
          <TypingUsers typingUsers={typingUsers}/>
        }

        <form onSubmit={this.handleOnSubmit}>
          <input ref="msg" onChange={this.handleOnChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  },

  handleOnSubmit(e) {
    let msg = this.refs.msg.getDOMNode().value;
    AppActions.sendMessage(msg);
    e.preventDefault();
  },

  handleOnChange() {
    var that = this;
    if (this.cancelTypingStop) {
      clearTimeout(this.cancelTypingStop);
    }
    this.cancelTypingStop = setTimeout(function() {AppActions.userStopTyping(that.props.name)}, 3000);
    AppActions.userStartTyping(this.props.name);
  }

});

export default ChatPage;
