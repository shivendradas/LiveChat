import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

class CustomDatePicker extends Component {

    onSelectDate(e) {
        this.props.onSelectDate(e);
    }

    render() {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={this.props.selectedDate}
                mode="date"
                is24Hour={true}
                display="calendar"
                onChange={(value) => { this.onSelectDate(value) }}
            />
        )
    }
}
export default CustomDatePicker;