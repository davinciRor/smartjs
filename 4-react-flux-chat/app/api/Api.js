import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
let socket = io.connect('http://ex1.smartjs.academy/');

function addUser(user) {
  socket.emit('add user', { username: user });
}

function newMessage(msg) {
  socket.emit('new message', { message: msg });
}

function userStartTyping(name) {
  socket.emit('typing', name);
}

function userStopTyping(name) {
  socket.emit('stop typing', name);
}

socket.on('new message', function(msg) {
   AppDispatcher.dispatch({
      type: ActionTypes.CHAT_UPDATE,
      data: msg
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
      // no op

    }
  }

)



