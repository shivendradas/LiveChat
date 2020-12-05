import { SET_DATEPICKER_VISIBLE } from "../constant/dataPicker";

const initialState = {
    isDatepickerVisible: false
};
const datePickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATEPICKER_VISIBLE:
            return Object.assign({}, state, {
                isDatepickerVisible: action.isVisible
            });
        default:
            return state;
    }
};

export default datePickerReducer;