import Realm from "realm";
import { databaseOptions } from "./dbconfiguration";
import * as userRegistrationQuery from './userRegistationQuery';
import * as singleChatDetailQuery from './singleChatDetailQuery';

export const getUserRegistrationQuery = () => {
    return userRegistrationQuery;
}

export const getSingleChatDetailQuery = () => {
    return singleChatDetailQuery;
}
export default realm = new Realm(databaseOptions);