import { userRegistrationSchema } from "./realmSchemas";

export const databaseOptions = {
    path: "livechat.realm",
    schema: [userRegistrationSchema],
    schemaVersion: 0 //optional
}