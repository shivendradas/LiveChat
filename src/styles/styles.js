import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        backgroundColor: '#ddeff9',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeAreaContainer: {
        backgroundColor: '#ddeff9',
        flex: 1
    },
    inputBox: {
        width: 300,
        backgroundColor: '#61a5c7',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#043c58',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: '#043c58',
        fontSize: 16
    },
    signupButton: {
        color: '#0e6089',
        fontSize: 16,
        fontWeight: '500'
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: '#043c58'
    },
    addBtnTouchableOpacityStyle: {
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
    },header: {
        backgroundColor: '#4591ed',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 20,
    },
    searchBar: {
        backgroundColor: '#f0eded',
        paddingHorizontal: 30,
        paddingVertical: Platform.OS === 'android' ? undefined : 15,
    }
});