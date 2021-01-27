import { singleChatDetailSchema, userRegistrationSchema } from "./realmSchemas";

export const databaseOptions = {
    path: "livechat.realm",
    schema: [userRegistrationSchema, singleChatDetailSchema],
    schemaVersion: 0 //optional
}