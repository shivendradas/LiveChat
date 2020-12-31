import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
export default class HomeTab extends React.Component {
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
              Home{'\n'}(You are on FirstPage)
                </Text>

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