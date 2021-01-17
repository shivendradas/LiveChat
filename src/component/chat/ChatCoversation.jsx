import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    Button
} from 'react-native';
import { connect } from 'react-redux'
import io from "socket.io-client";
import SocketIOClient from 'socket.io-client';
import { setTextMessage, setMessages, setReceiverId } from '../../action/chatAction.js';
import { CHAT_URL } from '../../constant/serviceUrls.js';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
//import styles from '../../styles/styles.js';

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

        this.socket.on('send_message', message => {
            var messages = Object.assign([], this.props.messages);
            var messageObject = {
                id: message.id,
                date:  message.date,
                type: 'in',
                content:  message.content,
                senderChatID:  message.senderChatID,
                receiverChatID:  message.receiverChatID,
                messageType:  message.messageType
            }
            messages.push(messageObject);
            this.props.setMessages(messages);
        });
    }
    
    sendMessage = () => {
        var messages = Object.assign([], this.props.messages);
        var id = new Date().getTime();
        var dateTime = new Date(id).toLocaleTimeString();
        var message = {
            id: id,
            date: dateTime,
            type: 'out',
            content: this.props.textMsg,
            senderChatID: this.props.senderId,
            receiverChatID: this.props.receiverId,
            messageType: "text"
        }
        messages.push(message);
        this.props.setMessages(messages);
           
        this.socket.emit('send_message', message);
        this.props.setTextMessage('');
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
                        console.log(item);
                        let inMessage = item.type === 'in';
                        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                        return (
                            <View style={[styles.item, itemStyle]}>
                                {!inMessage && this.renderDate(item.date)}
                                <View style={[styles.balloon]}>
                                    <Text>{item.content}</Text>
                                </View>
                                {inMessage && this.renderDate(item.date)}
                            </View>
                        )
                    }}
                    dataExtra={this.props}
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        backgroundColor: "#00BFFF",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 12,
        color: "#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#eeeeee",
        borderRadius: 300,
        padding: 5,
    },
});
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
        setMessages: (message) => {
            dispatch(setMessages(message))
        },
        setReceiverId: (receiverId) => {
            dispatch(setReceiverId(receiverId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatConversation);