import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    title: {
        fontSize: 48,
        color: '#f92e6a',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        padding: 10,
        width: 300,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#f92e6a',
        color: '#4d5156',
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningAlert: {
        paddingLeft: 10,
        color: '#bdbdbd',
        fontSize: 16,
    },
    buttonLogin: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f92e6a',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ffffffff'
    },
    textButtonLogin: {
        color: '#ffffffff',
    },
    registration: {
        marginTop: 20,
        color: '#4d5156'
    },
    linkSubscribe: {
        color: "#1877f2",
        fontSize: 16,
    },
});

export default styles;