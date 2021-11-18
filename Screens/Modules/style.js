import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
// const { width, height } = useWindowDimensions();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    module: {
        width: width-90,
        height: 70,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 40,
        marginVertical: 15,
        borderRadius: 20,
        backgroundColor: '#21aff0',
    },
    moduleText: {
        fontSize: 23,
        color: '#fff',
    },
    moduleSubject: {

    },
});

export default styles;