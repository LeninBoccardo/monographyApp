import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    questionText: {
        color: '#000000',
        paddingBottom: 5,
        fontSize: 20,
    },
    answerText: {
        paddingBottom: 30,
        fontSize: 15,
    },
    linkText: {
        color: '#0099ff',
    },
});

export default styles;