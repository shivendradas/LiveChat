import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HomeTab extends React.Component {
    render() {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text>ChatScreen</Text>
          </View>
        );
      }
}
export default HomeTab;