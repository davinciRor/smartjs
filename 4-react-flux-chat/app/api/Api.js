import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as WebApiUtils from './WebApiUtils';

let socket = io.connect('http://ex1.smartjs.academy/');

let Api = {
  [ActionTypes.USER_LOGINED]({ data }) {
    socket.emit('add user', data.name);
  },

  [ActionTypes.MSG_SENDED]({ data }) {
    socket.emit('new message', data.msg);
  },

  [ActionTypes.USER_START_TYPING]({ data }) {
    socket.emit('typing', data.name);
  },

  [ActionTypes.USER_STOP_TYPING]({ data }) {
    socket.emit('stop typing', data.name);
  }
}

AppDispatcher.register(payload => {
  if(Api[payload.type]) {
    Api[payload.type](payload);
  }
});

socket.on('login', numUsers => {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_LOGINED,
    data: numUsers
  });
});

socket.on('user joined', data => {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_JOINED,
    data: {
      username: data.username,
      numUsers: data.numUsers
    }
  });
});

socket.on('user left', data => {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_LEFT,
    data: {
      username: data.username,
      numUsers: data.numUsers
    }
  });
});

socket.on('new message', msg => {
  WebApiUtils.checkMessage(msg)
    .then(
      result => {
        AppDispatcher.dispatch({
          type: ActionTypes.CHAT_UPDATE,
          data: {
            username: msg.username,
            text: msg.message,
            links: result
          }
        });
      },
      error => {
        AppDispatcher.dispatch({
          type: ActionTypes.CHAT_UPDATE,
          data: {
            username: msg.username,
            text: msg.message,
            links: null
          }
        });
      }
    )
});

socket.on('typing', username => {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_START_TYPING,
    data: username
  });
});

socket.on('stop typing', username => {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_STOP_TYPING,
    data: username
  });
});
