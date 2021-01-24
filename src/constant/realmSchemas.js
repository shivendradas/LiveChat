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
