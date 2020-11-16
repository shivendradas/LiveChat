/**
 * Live Chat Application
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import { Provider } from 'react-redux'
import store from './src/store/store'
import Authentication from './src/component/login/Authentication';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Authentication />
      </Provider>      
    );
  }
}

export default App;
