import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },
    Tasks: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    DeleteTask: {
        justifyContent: "center",
        paddingLeft: 15,
    },
    DescriptionTask: {
        width: "75%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "black",
    },
    ButtonNewTask: {
        height: 60,
        width: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#f92e6a",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",   
    },
    IconButton: {
        color: "#ffffff",
        fontSize: 38,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#000000',
        borderWidth: 1,
    }
});

export default styles;