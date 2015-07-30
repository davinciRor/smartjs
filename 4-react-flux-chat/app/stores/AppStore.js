import Store from '.';
import ActionTypes from '../constants/ActionTypes';

import * as WebApiUtils from '../api/WebApiUtils';
import co from 'co';

class AppStore extends Store {
  constructor() {
    super();

    this._state = {
      name: '',
      messages: [],
      typingUsers: [],
      numUsers: 0
    }
  }

  getState() {
    return this._state;
  }

  [ActionTypes.USER_LOGINED]({ data }) {
    this._state.name = data.name;
    this.emitChange();
  }

  [ActionTypes.SERVER_USER_LOGINED]({ data }) {
    this._state.numUsers = data.numUsers;
    this.emitChange();
  }

  [ActionTypes.SERVER_USER_JOINED]({ data }) {
    this._state.messages.push({
      id: 'joined',
      username: data.username,
      numUsers: data.numUsers
    });

    this.emitChange();
  }

  [ActionTypes.SERVER_USER_LEFT]({ data }) {
    this._state.messages.push({
      id: 'left',
      username: data.username,
      numUsers: data.numUsers
    });

    this.emitChange();
  }

  [ActionTypes.MSG_SENDED]({ data }) {
    this._state.messages.push({
      username: this._state.name,
      message: {
        text: data.msg
      }
    });

    this.emitChange();
  }

  [ActionTypes.CHAT_UPDATE]({ data }) {
    let username = data.username;
    let message = data.text;
    let messages = this._state.messages;

    let matches = message.match('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?');

    if(matches && matches[0]) {
      WebApiUtils.checkLinks(matches[0])
        .then(
          result => {
            messages[messages.length-1].links = result;
            this.emitChange();
          },
          error => null
        );
    }

    messages.push({
      username: username,
      message: message,
      links: null
    });

    this.emitChange();
  }

  [ActionTypes.SERVER_START_TYPING]({ data }) {
    let username = data.username;

    if (this._state.typingUsers.indexOf(username) === -1) {
      this._state.typingUsers.push(username);
    }

    this.emitChange();
  }

  [ActionTypes.SERVER_STOP_TYPING]({ data }) {
    let username = data.username;
    let userIndex = this._state.typingUsers.indexOf(username);

    if (userIndex !== -1) {
      this._state.typingUsers.splice(userIndex, 1);
    }

    this.emitChange();
  }
}

export default new AppStore;
