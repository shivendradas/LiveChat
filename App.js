/**
 * Live Chat Application
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import Login from './src/component/login/Login';

class App extends React.Component {
  render() {
    return (
      <Login />
    );
  }
}

export default App;
