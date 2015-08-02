import React from 'react';
import AppStore from '../stores/AppStore';
import * as AppActions from '../actions/AppActions';

export default class Menu {
  constructor() {
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
  }

  handlerOnSubmit(e) {
    AppActions.changeImageGrid({
      rows: React.findDOMNode(this.refs.rows).value,
      cells: React.findDOMNode(this.refs.cells).value
    });
    e.preventDefault();
  }

  handleOnKeyDown(e) {
    if(e.keyCode == 46 || e.keyCode == 8 ||
       e.keyCode == 9 || e.keyCode == 27 ||
       (e.keyCode == 65 && e.ctrlKey === true) ||
       (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    else if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105 )) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Set images grid</h3>
        </div>
        <div className='panel-body'>
          <form onSubmit={this.handlerOnSubmit}>
            <div className='form-group'>
              <input className='form-control'
                     placeholder='rows'
                     ref='rows'
                     onKeyDown={this.handleOnKeyDown}/>
            </div>
            <div className='form-group'>
              <input className='form-control'
                     placeholder='cells'
                     ref='cells'
                     onKeyDown={this.handleOnKeyDown}/>
            </div>
            <div className='form-group'>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
