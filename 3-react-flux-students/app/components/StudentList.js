import React, { Component } from 'react';
import StudentListItem from './StudentListItem';
import ActionTypes from '../constants/ActionTypes';
import AppStore from '../stores/AppStore';
import * as AppActionCreators from '../actions/AppActionCreators';

export default class StudentList extends Component {
  constructor() {
    super();

    this.handleStoresChanged = this.handleStoresChanged.bind(this);
    this.state = AppStore.getState();
  }

  componentWillMount() {
    AppStore.on({
      [ActionTypes.STUDENT_LOADED_SUCCESS]: this.handleStoresChanged,
      [ActionTypes.STUDENT_LOADED_ERROR]: this.handleStoresChanged,
      [ActionTypes.STUDENT_CHANGED_STATUS_SUCCESS]: this.handleStoresChanged,
      [ActionTypes.STUDENT_CHANGED_STATUS_ERROR]: this.handleStoresChanged
    });

    AppActionCreators.getStudentList();
  }

  componentWillUnmount() {
    AppStore.off({
      [ActionTypes.STUDENT_LOADED_SUCCESS]: this.handleStoresChanged,
      [ActionTypes.STUDENT_LOADED_ERROR]: this.handleStoresChanged,
      [ActionTypes.STUDENT_CHANGED_STATUS_SUCCESS]: this.handleStoresChanged,
      [ActionTypes.STUDENT_CHANGED_STATUS_ERROR]: this.handleStoresChanged
    });
  }

  handleStoresChanged() {
    this.setState(AppStore.getState());
  }

  render() {
    let { students, error } = this.state;

    return (
      <div>
        {error && alert(error)}

        <ul className='student-list'>
          {
            Object.keys(students).map(key => {
              return <StudentListItem key={key} student={students[key]} />
            })
          }
        </ul>
      </div>
    );
  }
}
