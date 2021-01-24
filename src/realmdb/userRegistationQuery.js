import { userRegistrationSchema, USER_REGISTRATION_TBL } from "../constant/realmSchemas";
import Realm from "realm";
import { databaseOptions } from "./dbconfiguration";

/**
 * Get user detail using mobile number
 * @param {*} registeredNumber 
 */
export const getUserDetailByNumber = (registeredNumber) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const userDetail = realm.objectForPrimaryKey(USER_REGISTRATION_TBL, registeredNumber);
            return userDetail;
        })
    }).catch((error) => reject(error));
});
export const getUserDetail1 = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let userTable = realm.objects(USER_REGISTRATION_TBL).sorted('registeredNumber', true);
        resolve(userTable);
        const result = Array.from(userTable);
        if (result.length > 0) {
            return JSON.stringify(result[0]);
        } else {
            return "";
        }
    }).catch((error) => reject(error));
})
export const getUserDetail = async () => {
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
}
export const deleteUserDetail = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deleteUserTable = realm.objects(USER_REGISTRATION_TBL)
            realm.delete(deleteUserTable);
            resolve();
        })
    }).catch((error) => reject(error));
});
export const setUserDetail = (userdetail) => new Promise((resolve, reject) => {
    const isExist = getUserDetailByNumber(userdetail.registeredNumber);
    if (isExist && Array.from(isExist).length > 0) {
        console.log("Number is already saved.");
        return;
    }
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            try {
                realm.create(USER_REGISTRATION_TBL, userdetail)
                resolve(userdetail);
            } catch (error) {
                reject(error);
            }
        })
    }).catch((error) => reject(error));
});

