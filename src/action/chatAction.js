import { RECEIVER_ID, SENDER_ID, TEXT_MSG, ADD_TO_MESSAGE_ARRAY, GET_MESSAGES_FOR_INDIVIDUAL } from '../constant/chatType';
import dbStore from '../store/dbStore';

export const setSenderId = (senderId) => {
    return {
        type: SENDER_ID,
        senderId
    }
}
export const setReceiverId = (receiverId) => {
    return {
        type: RECEIVER_ID,
        receiverId
    }
}
export const setTextMessage = (message) => {
    return {
        type: TEXT_MSG,
        message
    }
}
export const setMessages = (message) => {
    return {
        type: ADD_TO_MESSAGE_ARRAY,
        message
    }
}
export const getMessages = (recieverId) => {
    return async (dispatch) => {
        try {
            const messages = await dbStore.getSingleChatDetailQuery().getMessages(recieverId);
            if (messages && messages.length > 0) {
                dispatch(setMessages(messages));
            } else {
                console.log("Error while saving chat detail")
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export const setMessagesToDb = (messages) => {
    return async (dispatch) => {
        try {
            const isSuccess = await dbStore.getSingleChatDetailQuery().setSingleChatConversation(messages[messages.length - 1]);
            if (isSuccess) {
                dispatch(setMessages(messages));
            } else {
                console.log("Error while saving chat detail")
            }
        } catch (error) {
            console.error(error);
        }
    }
}