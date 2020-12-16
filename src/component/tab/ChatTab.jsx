import React, { Component } from 'react';
import { NativeModules, PermissionsAndroid } from 'react-native';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import ContactList from '../ContactDetail/ContactList';

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
        <ContactList></ContactList>
      </SafeAreaView>
    );
  }
}
export default ChatTab;