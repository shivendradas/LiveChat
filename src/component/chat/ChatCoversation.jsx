import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import io from "socket.io-client";
import SocketIOClient from 'socket.io-client';
import { CHAT_URL } from '../../constant/serviceUrls.js';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import styles from '../../styles/styles.js';

class ChatConversation extends Component {
    socket;
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: []
        };
    }
    componentDidMount() {
        this.socket = io(CHAT_URL);
        //this.socket = SocketIOClient(CHAT_URL);
        console.log("chat=="+CHAT_URL)
        this.socket.on("chat_message", msg => {            
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
            console.log("msg====")
            console.log(this.state.chatMessages)
        });
        this.socket.emit('username', 'username1');
        this.socket.on("new_user_joined", msg => {            
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
        });
    }
    sendMessage = () => {
        this.socket.emit('chat_message', this.state.chatMessage);
        console.log(this.socket)
        this.setState({ chatMessage: '' });
    }
    submitChatMessage() {
        this.socket.emit('chat_message', this.state.chatMessage);
        this.setState({chatMessage: ''});
      }
    render() {
        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text style={{ borderWidth: 2, top: 500 }} key={chatMessage}>{chatMessage}</Text>
        ));
        console.log(this.state.chatMessage)
        return (
            <View style={styles.container}>
                <View style={{ ...styles.container}}>
                {chatMessages}
                </View>                 
                <View style={{ ...styles.bottomContainer, flexDirection: 'row' }}>                   
                    <View>
                        <TextInput
                            style={styles.normalInputBox}
                            placeholder='Type your message'
                            keyboardType='web-search'
                            ref='searchBar'
                            autoCorrect={false}
                            value={this.state.chatMessage}
                            onSubmitEditing={() => this.submitChatMessage()}
                            onChangeText={chatMessage => {
                                this.setState({ chatMessage });
                            }}
                        />
                    </View>
                    <TouchableHighlight style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.sendMessage() }} underlayColor='transparent'>
                        <View>
                            <Image style={{ width: 40, height: 40, right: -10 }}
                                source={require('../../res/images/send.png')} //Change your icon image here
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
export default ChatConversation;