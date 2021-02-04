import Realm from "realm";
import { databaseOptions } from "./dbconfiguration";
import { SINGLE_CHAT_DETAIL__TBL } from "./realmSchemas";

export const setSingleChatConversation = async (message) => {
    try {
        realm.write(() => {
            console.log("msg============")
            console.log(message)
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
        const messages = await realm.objects(SINGLE_CHAT_DETAIL__TBL).filtered('receiverChatID = "' + receiverId + '" OR senderChatID = "' + receiverId + '"').sorted('id', false);
        //const result = Array.from(messages);
        //const rows = JSON.parse(JSON.stringify([...messages]))
        //var result = Object.values(messages);
        var result = [];
        for (var i = 0; i < messages.length; i++) {
            result.push(messages[i]);
        }
        //var result = messages.slice(0, 10);
        if (result.length > 0) {
            //const jsonString = JSON.stringify(result);
            //return JSON.parse(jsonString);
            return result;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return '';
    }
}