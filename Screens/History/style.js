import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// const { width, height } = useWindowDimensions();


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    infoContainer: {
        marginLeft: 20,
        marginVertical: 12,
    },
    infoText: {
        paddingBottom: 10,
        fontSize: 20,
    },
    header: {
        flexDirection:'row', 
        justifyContent:'space-evenly'
    },
    headerItem: {
        width: width/3,
        height: height/15,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/3,
    },
    headerText: {
        color: '#000',
        fontSize: 20,
    },
    listContainer: {
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    listItem: {
        width: width/3,
        height: height/18,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/3,
        borderColor: '#000',
        fontSize: 12,
    },
    listText: {
        color: '#000',
        fontSize: 15,
    },
});

export default styles;