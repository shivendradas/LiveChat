import { combineReducers } from 'redux';
import datePickerReducer from './datePickerReducer';
import loginReducer from './loginReducer';
import contactDetailReducer from './contactDetailReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    auth: loginReducer,
    datePicker: datePickerReducer,
    contactDetail: contactDetailReducer,
    chat: chatReducer
})