import { StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    test: {
        width: width-90,
        height: 70,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 50,
        marginVertical: 15,
        borderRadius: 20,
        backgroundColor: '#21aff0',
    },
    testText: {
        fontSize: 23,
        color: '#fff',
    },
});

export default styles;