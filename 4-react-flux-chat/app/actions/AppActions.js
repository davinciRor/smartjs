import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as Api from '../api/Api';

export function userLogin(name) {
  AppDispatcher.dispatch({
    type: ActionTypes.USER_LOGINED,
    data: {
      name: name
    }
  });
}

export function sendMessage(msg) {
  AppDispatcher.dispatch({
    type: ActionTypes.MSG_SENDED,
    data: {
      msg: msg
    }
  });
}

export function userStartTyping(name) {
  AppDispatcher.dispatch({
    type: ActionTypes.USER_START_TYPING,
    data: {
      name: name
    }
  });
}

export function userStopTyping(name) {
  AppDispatcher.dispatch({
    type: ActionTypes.USER_STOP_TYPING,
    data: {
      name: name
    }
  });
}

