import React from 'react';
import StudentList from './components/StudentList';

export default class App {
  render() {
    return (
      <div>
        <StudentList/>
      </div>
    );
  }
}

React.render(<App/>, document.body);
