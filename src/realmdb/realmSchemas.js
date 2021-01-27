export const USER_REGISTRATION_TBL = 'USER_REGISTRATION_TBL';
export const SINGLE_CHAT_DETAIL__TBL = 'SINGLE_CHAT_DETAIL__TBL';
export const CHAT_SNAP_TBL = 'CHAT_SNAP_TBL';

export const userRegistrationSchema = {
    name: USER_REGISTRATION_TBL,
    primaryKey: 'registeredNumber',
    properties: {
        registeredNumber: { type: 'string' },
        user: { type: 'string' },
        registeredEmail: { type: 'string' }
    }
}

export const singleChatDetailSchema = {
    name: SINGLE_CHAT_DETAIL__TBL,
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        date: { type: 'string' },
        type: { type: 'string' },
        isMessageRead: { type: 'bool', default: false },
        isMessageReached: { type: 'bool'},
        content: { type: 'string' },
        senderChatID: { type: 'string' },
        receiverChatID: { type: 'string' },
        messageType: { type: 'string' }
    }
}

