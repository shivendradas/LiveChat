import React, { Component } from 'react';
import { Text, View } from 'react-native';

class EventTab extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>Add Events</Text>
        <Text>Add Birthday event</Text>
        <Text>Add Marriage Aniversary Event</Text>
        <Text>Add Other Event</Text>
      </View>
    );
  }
}
export default EventTab;