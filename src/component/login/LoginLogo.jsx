import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
class LoginLogo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../res/images/logo.png')} />
                <Text style={styles.logoText}>
                    Welcome to Live Chat App
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    }
});
export default LoginLogo