import { combineReducers } from 'redux'
import datePickerReducer from './datePickerReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    auth: loginReducer,
    datePicker: datePickerReducer
})