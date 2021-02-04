import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { connect } from 'react-redux'
import io from "socket.io-client";
import SocketIOClient from 'socket.io-client';
import { setTextMessage, getMessages, setReceiverId, setMessagesToDb } from '../../action/chatAction.js';
import { MESSAGE_IN, MESSAGE_OUT } from '../../constant/chatType.js';
import { CHAT_URL } from '../../constant/serviceUrls.js';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import styles from '../../styles/chatScreenStyle.js';

class ChatConversation extends Component {

    constructor(props) {
        super(props);
        this.props.getMessagesForIndividual(props.route.params.contactNumber);
    }
    componentDidMount() {
        this.props.setReceiverId(this.props.route.params.contactNumber);
        this.socket = io(CHAT_URL);
        //this.socket = SocketIOClient(CHAT_URL); 
        if (this.props && this.props.senderId) {
            this.socket.emit('userId', this.props.senderId);
        } 

        this.socket.on('send_message', message => {
            var messages = Object.assign([], this.props.messages);
            var messageObject = {
                id: message.id,
                date: message.date,
                type: MESSAGE_IN,
                isMessageRead: false,
                isMessageReached: false,
                content: message.content,
                senderChatID: message.senderChatID,
                receiverChatID: message.receiverChatID,
                messageType: message.messageType
            }
            messages.push(messageObject);
            this.props.setMessagesToDb(messages);
        });
    }

    sendMessage = () => {
        var messages = Object.assign([], this.props.messages);
        var id = new Date().getTime();
        var dateTime = new Date(id).toLocaleTimeString();
        var message = {
            id: id,
            date: dateTime,
            type: MESSAGE_OUT,
            isMessageRead: false,
            isMessageReached: false,
            content: this.props.textMsg,
            senderChatID: this.props.senderId,
            receiverChatID: this.props.receiverId,
            messageType: "text"
        }
        if (message.content != '') {
            messages.push(message);
            this.props.setMessagesToDb(messages);

            this.socket.emit('send_message', message);
            this.props.setTextMessage('');
        }
    }
    submitChatMessage() {
        this.sendMessage();
    }

    renderDate = (date) => {
        return (
            <Text style={styles.time}>
                {date}
            </Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.props.messages}
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    renderItem={(message) => {
                        const item = message.item;
                        let inMessage = item.type === 'in';
                        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                        let itemBackgroundStyle = inMessage ? styles.itemStyleIn : styles.itemStyleOut;
                        let itemColor = inMessage ? styles.itemColorIn : styles.itemColorOut;
                        return (
                            <View style={[itemBackgroundStyle, itemStyle]}>
                                {!inMessage && this.renderDate(item.date)}
                                <View style={[styles.balloon]}>
                                    <Text>{item.content}</Text>
                                </View>
                                {inMessage && this.renderDate(item.date)}
                            </View>
                        )
                    }}
                    dataExtra={this.props}
                    maxToRenderPerBatch={10}
                />
                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Write a message..."
                            underlineColorAndroid='transparent'
                            value={this.props.textMsg}
                            onSubmitEditing={() => this.submitChatMessage()}
                            onChangeText={this.props.setTextMessage}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnSend} onPress={() => { this.sendMessage() }}>
                        <Image source={require('../../res/images/send.png')} style={styles.iconSend} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        senderId: state.chat.senderId,
        receiverId: state.chat.receiverId,
        textMsg: state.chat.textMsg,
        messages: state.chat.messages
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTextMessage: (message) => {
            dispatch(setTextMessage(message))
        },
        setMessagesToDb: (message) => {
            dispatch(setMessagesToDb(message))
        },
        setReceiverId: (receiverId) => {
            dispatch(setReceiverId(receiverId))
        },
        getMessagesForIndividual: (receiverId) => {
            dispatch(getMessages(receiverId))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatConversation);