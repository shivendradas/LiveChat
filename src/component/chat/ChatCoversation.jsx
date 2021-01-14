import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import io from "socket.io-client";
import SocketIOClient from 'socket.io-client';
import { setTextMessage, setReceiverId } from '../../action/chatAction.js';
import { CHAT_URL } from '../../constant/serviceUrls.js';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import styles from '../../styles/styles.js';

class ChatConversation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setReceiverId(this.props.route.params.contactNumber);
        this.socket = io(CHAT_URL);
        //this.socket = SocketIOClient(CHAT_URL); 
        console.log(this.props)
        console.log("chat==" + CHAT_URL)
        this.socket.emit('userId', this.props.senderId);
    }
    sendMessage = () => {
        const message = {
            'content': this.props.textMsg,
            'senderChatID': this.props.senderId,
            'receiverChatID': this.props.receiverId
        }
        this.socket.emit('send_message', message);
        this.props.setTextMessage('');
    }
    submitChatMessage() {
        this.sendMessage();
    }
    render() {
        /*const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text style={{ borderWidth: 2, top: 500 }} key={chatMessage}>{chatMessage}</Text>
        ));
        console.log(this.state.chatMessage)*/
        return (
            <View style={styles.container}>
                <View style={{ ...styles.container }}>
                    {/*chatMessages*/}
                </View>
                <View style={{ ...styles.bottomContainer, flexDirection: 'row' }}>
                    <View>
                        <TextInput
                            style={styles.normalInputBox}
                            placeholder='Type your message'
                            keyboardType='web-search'
                            ref='searchBar'
                            autoCorrect={false}
                            value={this.props.textMsg}
                            onSubmitEditing={() => this.submitChatMessage()}
                            onChangeText={this.props.setTextMessage}

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
const mapStateToProps = (state) => {
    return {
        senderId: state.chat.senderId,
        receiverId: state.chat.receiverId,
        textMsg: state.chat.textMsg
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTextMessage: (message) => {
            dispatch(setTextMessage(message))
        },
        setReceiverId: (receiverId) => {
            dispatch(setReceiverId(receiverId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatConversation);