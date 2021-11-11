import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
    infoContainer: {
        width: "100%",
        height: "80%",
        padding: 30,
    },
    infoText: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    button: {
        height: "50%",
        width: "50%",
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#ffeeee",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 25,
    },
});

export default styles;