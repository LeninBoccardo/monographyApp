import { StyleSheet, Dimensions } from 'react-native';

width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#21aff0",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
        modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    scrollContainer: {
        backgroundColor: '#eee',
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: width-40,
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: width-40,
        height: width-40,
        resizeMode: 'contain',
    },
    questionText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'justify',
        marginBottom: 20,
    },
    radioBox: {
        borderColor: '#cccccc',
    },
    radioText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'justify',
    },
    buttonContainer: {
        width: width-40,
        alignItems: 'center',
    },
    confirmButton: {
        marginVertical: 20,
        backgroundColor: '#21aff0',
        width: width-100,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});
export default styles;