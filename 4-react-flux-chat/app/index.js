import React from 'react';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import AppStore from './stores/AppStore';
import * as AppActions from './actions/AppActions';

let App = React.createClass({
  getInitialState() {
    return AppStore.getState();
  },

  componentWillMount() {
    AppStore.addChangeListener(this.handleStoresChanged);
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this.handleStoresChanged);
  },

  handleStoresChanged() {
    this.setState(AppStore.getState());
  },

  render() {
    let { name, messages, typingUsers } = this.state;

    return (
      <div>
        {!name &&
          <LoginPage/>
        }

        {name &&
          <ChatPage name={name}
                    messages={messages}
                    typingUsers={typingUsers}/>
        }
      </div>
    );
  }

})

React.render(React.createElement(App), document.body);
