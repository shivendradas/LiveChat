import { RECEIVER_ID, SENDER_ID, TEXT_MSG } from "../constant/chatType";

const initialState = {
    senderId: "",
    receiverId: "",
    textMsg: ""
};
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SENDER_ID:
            return Object.assign({}, state,
                {
                    senderId: action.senderId
                });
        case RECEIVER_ID:
            return Object.assign({}, state,
                {
                    receiverId: action.receiverId
                });
        case TEXT_MSG:
            return Object.assign({}, state,
                {
                    textMsg: action.message
                });
        default:
            return state;
    }
};

export default chatReducer;