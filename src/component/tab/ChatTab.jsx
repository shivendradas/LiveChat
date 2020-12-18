import React, { Component } from 'react';
import { NativeModules, PermissionsAndroid } from 'react-native';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import SelectedContact from '../ContactDetail/SelectedContact';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

class ChatTab extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SelectedContact navigation={this.props.navigation}></SelectedContact>
      </SafeAreaView>
    );
  }
}
export default ChatTab;