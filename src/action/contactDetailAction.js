import { LIST_CONTACTS } from "../constant/contactDetails"

export const listContacts = (contacts) => {
    return {
        type: LIST_CONTACTS,
        contacts
    }
}