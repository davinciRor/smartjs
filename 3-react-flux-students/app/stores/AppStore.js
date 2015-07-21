import ActionTypes from '../constants/ActionTypes';
import Store from '.';

class AppStore extends Store {
  constructor() {
    super();

    this._state = {
      students: {},
      error: false
    }
  }

  getState() {
    return this._state;
  }

  [ActionTypes.STUDENT_LOADED_SUCCESS]({ data }) {
    data.forEach(student => {
      this._state.students[student.id] = student;
    });
    this._state.error = false;
    this.emit(ActionTypes.STUDENT_LOADED_SUCCESS);
  }

  [ActionTypes.STUDENT_LOADED_ERROR]({ error }) {
    this._state.error = error;
    this.emit(ActionTypes.STUDENT_LOADED_ERROR);
  }

  [ActionTypes.STUDENT_CHANGED_STATUS_SUCCESS]({ data }) {
    this._state.students[data.id] = data;
    this._state.error = false;
    this.emit(ActionTypes.STUDENT_CHANGED_STATUS_SUCCESS);
  }

  [ActionTypes.STUDENT_CHANGED_STATUS_ERROR]({ error }) {
    this._state.error = error;
    this.emit(ActionTypes.STUDENT_CHANGED_STATUS_ERROR);
  }
  
}

export default new AppStore;
