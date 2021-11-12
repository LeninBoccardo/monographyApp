import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    infoContainer: {
        flex: 6,
        padding: 30,
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 20,
        textAlign: 'auto',
        color: '#000',
    },
    inputLabel: {
        fontSize: 20,
        color: '#000',
    },
    inputBox: {
        flex: 5,
        justifyContent: 'space-evenly',
        padding: 20,
        paddingLeft: 30,
    },
    inputField: {

    },
    infoButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/3,
        height: 50,
        backgroundColor: '#21aff0',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    infoButtonText: {
        fontSize: 20,
        color: '#fff',
    },
    initContainer: {
        width: width,
        height: height/12,
        justifyContent: 'center',
        padding: 20,
    },
    dateButtonContainer: {
        height: 50,
        width: width-50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21aff0',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        width: 50,
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
    pickerView: {
        borderRadius: 20,
        backgroundColor: '#21aff0',
    },
    pickerStyle: {
        
    },
});

export default styles;