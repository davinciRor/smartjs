import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

export default class Store extends EventEmitter {

  constructor(defs) {
    super();

    this._state = {};
    this._callbacks = {};
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));

    assign(this, defs);
  }

  getState() {
    return this._state;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  handleAction(action) {
    let that = this;

    let callbacks = this._callbacks[action.type];
    callbacks && callbacks.map(callback => callback(action, that._state));
  }

  bindActions(type, callback) {
    this._callbacks[type] = this._callbacks[type] || [];
    this._callbacks[type].push(callback);
  }

}

