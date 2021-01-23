import Realm from "realm";

export const USER_REGISTRATION_TBL = "USER_REGISTRATION_TBL";
export const userRegistrationSchema = {
    name: USER_REGISTRATION_TBL,
    primaryKey: 'registeredNumber',
    properties: {
        registeredNumber: { type: 'string' },
        user: { type: 'string' },
        registeredEmail: { type: 'string' }
    }
}
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
        console.log(Array.from(userTable))
        resolve(userTable);
        const result = Array.from(userTable);
        if (result.length > 0) {
            return JSON.stringify(result[0]);
        } else {
            return "";
        }
    }).catch((error) => reject(error));
})
/**
 * Get user detail
 */
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
/**
 * Delete user detail table
 */
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
    if (isExist) {
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

const databaseOptions = {
    path: "livechat.realm",
    schema: [userRegistrationSchema],
    schemaVersion: 0 //optional
}
export default realm = new Realm(databaseOptions);