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

/*export const getUserDetail = async () => {
    try {
        const userTable = await realm.objects(USER_REGISTRATION_TBL).sorted('registeredNumber', true);
        const result = Array.from(userTable);
        if (result.length > 0) {
            return JSON.stringify(result[0]);
        } else {
            return '';
        }
    } catch (error) {
        console.log(error);
        return '';
    }
}*/