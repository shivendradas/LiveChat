/**
 * Live Chat Application
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import MainTab from './src/component/tab/MainTab';

class App extends React.Component {
  render() {
    return (
      <MainTab />
    );
  }
}
export default App;
