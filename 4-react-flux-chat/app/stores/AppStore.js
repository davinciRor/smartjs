import ActionTypes from '../constants/ActionTypes';
import Store from '../utils/StoreUtils';

const AppStore = new Store({
  _state: {
    name: null,
    messages: [],
    typingUsers: []
  }
});

AppStore.bindActions(ActionTypes.USER_LOGINED, (action, state) => {
  let data = action.data;

  state.name = data.name;

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
  let username = data.username.username;
  let message = data.message.message;
  console.log('message: ', message)
  let matches = message.match('(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?');
  console.log('matches: ', matches)

  state.messages.push({
    username: username,
    message: {
      text: message,
      //TODO: Set array of matched links
      links: matches && matches[0] ? [matches[0]] : []
    }
  });

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_START_TYPING, (action, state) => {
  let data = action.data;
  let username = data.username.username;

  if (state.typingUsers.indexOf(username) === -1) {
    state.typingUsers.push(username);
  }

  AppStore.emitChange();
});

AppStore.bindActions(ActionTypes.SERVER_STOP_TYPING, (action, state) => {
  let data = action.data;
  let username = data.username.username;
  let userIndex = state.typingUsers.indexOf(username);

  if (userIndex !== -1) {
    state.typingUsers.splice(userIndex, 1);
  }

  AppStore.emitChange();
});


export default AppStore;
