import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import { Icon } from 'react-native-elements'
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions'
import styles from '../../styles/styles.js';


class SelectedContact extends Component {
    constructor(props) {
        super(props);
    }
    async getContactListPermission() {
        try {
            var res = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
            if (res == RESULTS.DENIED) {
                res = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
            } else if (res == RESULTS.GRANTED) {
                this.props.navigation.navigate('SearchContact',{ name: 'Search Contacts' })
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.addBtnTouchableOpacityStyle}  onPress={async () => { await this.getContactListPermission() }}> 
                    <Text style = {styles.floatingButtonStyle}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
export default SelectedContact;