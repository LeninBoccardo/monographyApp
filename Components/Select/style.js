import { StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

const app = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        marginHorizontal: 20,
        borderRadius: 8,
        fontSize: 18,
        borderColor: '#CCC',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txt: {
        color: '#555',
        fontSize: 16,
        width: width-90,
    }, 
});

export default app;