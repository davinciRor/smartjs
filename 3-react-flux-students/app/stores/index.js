import AppDispatcher from '../AppDispatcher';
import EventEmitter from 'emmett';

export default class Store extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(payload => {
      if (this[payload.type]) {
        this[payload.type](payload);
      }
    });
  }
}
