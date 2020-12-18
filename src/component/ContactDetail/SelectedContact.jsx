import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { Icon } from 'react-native-elements'
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions'


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
                this.props.navigation.navigate('SearchContact')
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touchableOpacityStyle}  onPress={async () => { await this.getContactListPermission() }}> 
                    <Text style = {styles.floatingButtonStyle}>+</Text>
                </TouchableOpacity>
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
        fontSize:30
    }
});
export default SelectedContact;