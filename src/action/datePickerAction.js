import { SET_DATEPICKER_VISIBLE } from "../constant/dataPicker";

export const setDatepickerVisible = (isVisible) => {
    return {
        type: SET_DATEPICKER_VISIBLE,
        isVisible
    }
}
