import ActionTypes from '../constants/ActionTypes';
import Store from '../utils/StoreUtils';

const AppStore = new Store({
  _state: {
    name: null,
    messages: [],
    typingUsers: [],
    numUsers: 0
  }
});

AppStore.bindActions(ActionTypes.USER_LOGINED, (action, state) => {
  let data = action.data;

  state.name = data.name;

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_USER_LOGINED, (action, state) => {
  let data = action.data;

  state.numUsers = data.numUsers;

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_USER_JOINED, (action, state) => {
  let data = action.data;

  state.messages.push({
    id: 'joined',
    username: data.username,
    numUsers: data.numUsers
  });

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_USER_LEFT, (action, state) => {
  let data = action.data;

  state.messages.push({
    id: 'left',
    username: data.username,
    numUsers: data.numUsers
  });

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.MSG_SENDED, (action, state) => {
  let data = action.data;

    state.messages.push({
      username: state.name,
      message: {
        text: data.msg
      }
    });

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.CHAT_UPDATE, (action, state) => {
  let data = action.data;
  let username = data.username;
  let message = data.message;

  state.messages.push({
    username: username,
    message: data
  });

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_START_TYPING, (action, state) => {
  let data = action.data;
  let username = data.username;

  if (state.typingUsers.indexOf(username) === -1) {
    state.typingUsers.push(username);
  }

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_STOP_TYPING, (action, state) => {
  let data = action.data;
  let username = data.username;
  let userIndex = state.typingUsers.indexOf(username);

  if (userIndex !== -1) {
    state.typingUsers.splice(userIndex, 1);
  }

  AppStore.emitChange();
});

export default AppStore;
