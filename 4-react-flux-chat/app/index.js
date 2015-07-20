import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import AppStore from './stores/AppStore';
import * as AppActions from './actions/AppActions';

export default class App extends Component {
  constructor() {
    super();

    this.handleStoresChanged = this.handleStoresChanged.bind(this);
    this.state = AppStore.getState();
  }

  componentWillMount() {
    AppStore.addChangeListener(this.handleStoresChanged);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.handleStoresChanged);
  }

  handleStoresChanged() {
    this.setState(AppStore.getState());
  }

  render() {
    let { name, messages, typingUsers, numUsers } = this.state;

    return (
      <div>
        {!name &&
          <LoginPage/>
        }

        {name &&
          <ChatPage name={name}
                    messages={messages}
                    typingUsers={typingUsers} 
                    numUsers={numUsers} />
        }
      </div>
    );
  } 
}

React.render(<App/>, document.body);
