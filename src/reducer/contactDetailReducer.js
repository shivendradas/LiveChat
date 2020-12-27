import { LIST_CONTACTS } from "../constant/contactDetails";

const initialState = {
    contacts: []
};
const contactDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_CONTACTS:
            return Object.assign({}, state,
                {
                    contacts: action.contacts
                });

        default:
            return state;
    }
};

export default contactDetailReducer;