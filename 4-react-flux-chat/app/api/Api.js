import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as WebApiUtils from './WebApiUtils';

let socket = io.connect('http://ex1.smartjs.academy/');

function addUser(user) {
  socket.emit('add user', user);
}

function newMessage(msg) {
  socket.emit('new message', msg);
}

function userStartTyping(name) {
  socket.emit('typing', name);
}

function userStopTyping(name) {
  socket.emit('stop typing', name);
}

socket.on('login', function(numUsers) {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_LOGINED,
    data: numUsers
  });
});

socket.on('user joined', function(data) {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_JOINED,
    data: {
      username: data.username,
      numUsers: data.numUsers
    }
  });
});

socket.on('user left', function(data) {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_USER_LEFT,
    data: {
      username: data.username,
      numUsers: data.numUsers
    }
  });
});

socket.on('new message', function(msg) {
  let message = WebApiUtils.checkMessage(msg);
  let images;

  if(message) {
    images = checkLinks(message);
  }

  AppDispatcher.dispatch({
    type: ActionTypes.CHAT_UPDATE,
    data: {
      username: msg.username,
      text: msg.message,
      links: images
    }
  });
});

socket.on('typing', function(username) {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_START_TYPING,
    data: username
  });
});

socket.on('stop typing', function(username) {
  AppDispatcher.dispatch({
    type: ActionTypes.SERVER_STOP_TYPING,
    data: username
  });
});


function checkLinks(link) {
  let image = new Image(400);
  image.src = link;

  return image.complete ? [image] : [];
}


AppDispatcher.register(

  function(action) {
    switch (action.type) {

      case ActionTypes.USER_LOGINED:
        addUser(action.data.name);
        break;

      case ActionTypes.MSG_SENDED:
        newMessage(action.data.msg);
        break;

      case ActionTypes.USER_START_TYPING:
        userStartTyping(action.data.name);
        break;

      case ActionTypes.USER_STOP_TYPING:
        userStopTyping(action.data.name);
        break;

      default:

    }
  }

)
