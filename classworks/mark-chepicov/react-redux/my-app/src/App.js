import React, { PureComponent } from 'react';
import './main.css';
import { BrowserRouter as Router} from 'react-router-dom';
import AppBody from './Components/app/app-body.js';
import { Provider } from 'react-redux';
import store from './store';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router> 
          <AppBody />
        </Router>
      </Provider>
    );
  }
}

export default App;