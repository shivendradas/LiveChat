import { RECEIVER_ID, SENDER_ID, TEXT_MSG } from '../constant/chatType';

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