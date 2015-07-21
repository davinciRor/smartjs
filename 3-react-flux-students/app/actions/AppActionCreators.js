import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as Api from '../api/Api';

export function getStudentList() {
  Api.getRequest().then(
    data => AppDispatcher.dispatch({
      type: ActionTypes.STUDENT_LOADED_SUCCESS,
      data
    }),
    error => AppDispatcher.dispatch({
      type: ActionTypes.STUDENT_LOADED_ERROR,
      error
    })
  )
}

export function setStudentStatus(data) {
  Api.postRequest(data).then(
    () => AppDispatcher.dispatch({
      type: ActionTypes.STUDENT_CHANGED_STATUS_SUCCESS,
      data
    }),
    error => AppDispatcher.dispatch({
      type: ActionTypes.STUDENT_CHANGED_STATUS_ERROR,
      error
    })
  )
}
