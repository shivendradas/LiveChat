import Realm from "realm";
import { databaseOptions } from "./dbconfiguration";
import { SINGLE_CHAT_DETAIL__TBL } from "./realmSchemas";

export const setSingleChatConversation = async (message) => {
    try {
        realm.write(() => {
            realm.create(SINGLE_CHAT_DETAIL__TBL, message);
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
/**
 * Get all message between sender and receiver
 * @param {} receiverId 
 */
export const getMessages = async (receiverId) => {
    try {
        const messages = await realm.objects(SINGLE_CHAT_DETAIL__TBL).filtered('receiverChatID = "' + receiverId + '" OR senderChatID = "' + receiverId + '"');
        const result = Array.from(messages);
        if (result.length > 0) {
            const jsonString = JSON.stringify(result);
            return JSON.parse(jsonString);
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return '';
    }
}