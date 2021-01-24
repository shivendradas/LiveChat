import Realm from "realm";
import { databaseOptions } from "./dbconfiguration";
import * as userRegistrationQuery from './userRegistationQuery';

export const getUserRegistrationQuery = () => {
    return userRegistrationQuery;
}
export default realm = new Realm(databaseOptions);