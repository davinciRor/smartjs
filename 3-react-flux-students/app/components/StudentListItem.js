import React from 'react';
import AppStore from '../stores/AppStore';
import * as AppActionCreators from '../actions/AppActionCreators';
import statusList from '../data/StudentStatusList';
import cx from 'classnames';

export default class StudentListItem {
  render() {
    this._student = this.props.student;
    let status = this._student.status;

    let classes = cx({
      'student': true,
      'active': status === 'active',
      'redcard': status === 'redcard',
      'removed': status === 'removed'
    });

    return (
      <li className={classes}>
        <div className='student__name'>{this._student.name}</div>
        <div>
        <select className='student__status'
                ref='select'
                value={status}
                onChange={this.changeStatus.bind(this)}>

          {statusList.map((status, i) => {
            return <option key={i}>{status}</option>
          })}

        </select>
        </div>
      </li>
    );
  }

  changeStatus() {
    let data = {
      id: this._student.id,
      name: this._student.name,
      phone: this._student.phone,
      status: React.findDOMNode(this.refs.select).value
    }
    AppActionCreators.setStudentStatus(data);
  }
}
