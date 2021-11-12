import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    itemContainer: {
        justifyContent: 'center',
        marginVertical: 3,
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginBottom: 5,
    },
    titleText: {
        color: '#222',
        textDecorationStyle: 'solid',
        fontSize: 30,
        fontWeight: 'bold',
    },
    contentContainer: {
        marginBottom: 10,
    },
    textContainer: {
        marginVertical: 5,
    },
    text: {
        color: '#222222',
        fontSize: 20,
        lineHeight: 25,
        textAlign: 'justify',
    },
    imageContainer: {
        width: width-40,
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: width-40,
        height: width-40,
        resizeMode: 'contain',
    },
});

export default styles;