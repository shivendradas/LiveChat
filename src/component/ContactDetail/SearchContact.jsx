import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Contacts from 'react-native-contacts';
//import { Icon } from 'react-native-elements'
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions'

class SearchContact extends Component {
    constructor(props) {
        super(props);
    }
    async getContactListPermission() {
        try {
            var res = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
            if (res == RESULTS.DENIED) {
                res = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
            }

        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Search contacts</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },

    touchableOpacityStyle: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 100
    },

    floatingButtonStyle: {
        fontSize: 30
    }
});
export default SearchContact;