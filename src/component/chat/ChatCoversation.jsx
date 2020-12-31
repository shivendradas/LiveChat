import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/styles.js';

class ChatConversation extends Component {

    render() {
        return (
            <View style = {styles.container}>
                <Text>Chat page</Text>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                />
            </View>
        )
    }
}
export default ChatConversation;