import { RECEIVER_ID, SENDER_ID, TEXT_MSG } from "../constant/chatType";

const initialState = {
    senderId: "",
    receiverId: "",
    textMsg: "",
    messages: [
        { id: 1, date: "9:50 am", type: 'in', message: "Lorem ipsum dolor sit amet", messageType: "text" },
        { id: 2, date: "9:50 am", type: 'out', message: "Lorem ipsum dolor sit amet", messageType: "text" }
    ]
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