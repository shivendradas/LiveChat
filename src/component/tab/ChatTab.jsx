import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

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
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginBottom: 16
              }}>
              Setting{'\n'}(You are on Chat Page)
          </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={
                () => this.props.navigation.navigate('HomeTab')
              }>
              <Text>Go to Home Tab</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }}>
            React Native Tab Navigation
        </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: 'grey'
            }}>
            www.aboutreact.com
        </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default ChatTab;