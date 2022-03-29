import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Modal,
    Image,
    ActivityIndicator,
} from 'react-native';
import styles from './style';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RadioButton from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Test({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState(route.params.userId);
    const [testData, setTestData] = useState(null);
    const [currentTest, setCurrentTest] = useState(null);
    const [testDataIndex, setTestDataIndex] = useState(0);
    const [radioButtonsData, setRadioButtonsData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalMessage, setModalMessage] = useState('');
    const [grade, setGrade] = useState(0);
    const [gradeSum, setGradeSum] = useState(0);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getRadioButtonsData = (data) => {
        try {
            const list = [];

            for (let index = 0; index < data.choices.length; index++) {
                list.push({
                    index: index,
                    label: capitalizeFirstLetter(data.choices[index]),
                    value: data.choices[index],
                })
            }

            setRadioButtonsData(list);
        } catch (error) {
            console.log('getRadioButtonsData: ', error)
        }
    };

    useEffect(() => {
        const getTestData = async () => {
            try {
                await firebase()
                    .collection('InitTests')
                    .orderBy('order', 'asc')
                    .get()
                    .then((query) => {
                        const list = [];
                        
                        query.forEach((doc) => {
                            list.push({...doc.data(), id: doc.id});
                        });

                        console.log('list: ', list);
                        
                        (async () => {
                            for (let index = 0; index < list.length; index++) {
                                if (list[index].imageRef !== 'undefined') {
                                    try {
                                        await storage()
                                            .ref(list[index].imageRef)
                                            .getDownloadURL()
                                            .then(url => {
                                                list[index].image = url;
                                                console.log('list: ', list);
                                            });    
                                    } catch (error) {
                                        console.log('getImageData: ', error);
                                    }
                                    
                                }
                            }
                            setTestData(list);

                            setCurrentTest(list[testDataIndex]);
                            
                            getRadioButtonsData(list[testDataIndex]);
                        })();
                    })
                    .then(() => setLoading(false))
            } catch (error) {
                console.log('getTestData: ', error);
            }           
        };

        const checkInitTest = () => {
            try {
                firebase()
                    .collection('UsersInfo')
                    .doc(userId)
                    .onSnapshot((doc) => {
                        console.log('doc: ', doc.id);
                        if (typeof(doc.data().initTests) === 'undefined' || doc.data().initTests === false) {
                            getTestData();
                        } else {
                            navigation.navigate('Menu', { userId: userId })   
                        }
                    })
            } catch (error) {
                console.log('checkInitTest: ', error);
            }
        };

        checkInitTest();
    }, []);

    const userDidTests = async () => {
        try {
            await firebase()
                .collection('UsersInfo')
                .doc(userId)
                .update({
                    initTests: true,
                    grade: gradeCalculated(gradeSum).finalGrade,
                })
                .then(() => navigation.navigate('Menu', { userId: userId }))
        } catch (error) {
            console.log('userDidTests: ', error);
        }
    }

    const addUserData = () => {
        try {
            firebase()
                .collection('UsersInfo')
                .doc(userId)
                .collection('InitTests')
                .doc(testData[testDataIndex].id)
                .set({
                    testId: testData[testDataIndex].id,
                    userAnswer: selectedValue,
                    subject: testData[testDataIndex].subject,
                    completionDate: firebase.Timestamp.fromDate(new Date()),
                    gotRight: (testData[testDataIndex].choices[testData[testDataIndex].correct] === selectedValue),
                })
                .then(() => {
                    console.log('Data Added')
                })
        } catch (error) {
            console.log('addUserData: ', error);
        }
    };

    const gradeCalculated = (grade) => {
        let finalGrade = grade/2;
        let message = '';
        let finalGradeMessage = '';

        if (finalGrade <= 3) {
            message = 'Seu conhecimento em Engenharia Social é razoável mas não se preocupe, estamos aqui para mudar isso.';
        } else if (finalGrade <= 6) {
            message = 'Seu conhecimento em Engenharia Social é bom mas há ainda algumas brechas que o app pode ajudar a preencher.';
        } else if (finalGrade <= 9) {
            message = 'Seu conhecimento em Engenharia Social é bem avançado mas ainda pode melhorar.';
        } else {
            message = 'Seu conhecimento em Engenharia Social é pleno, mesmo assim não deixe de conferir o restante do app.';
        }

        //format a string to show two decimal places

        finalGradeMessage = finalGrade.toFixed(1) + '! ' + message;

        return {finalGrade, finalGradeMessage}
    }

    const shiftTestData = () => {
        setTestDataIndex(testDataIndex + 1);
        setSelectedValue(null);
        setRadioButtonsData(null);
        setCurrentTest(testData[testDataIndex+1]);
        getRadioButtonsData(testData[testDataIndex+1]);
    }
    
    if (!loading) {
        return(
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        userDidTests();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                {modalMessage}
                            </Text>
                            { !selectedValue ?
                                <View>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Ok</Text>    
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    { testDataIndex === testData.length - 1 ?
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                userDidTests();
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Ok</Text>
                                        </TouchableOpacity>
                                        :
                                        <View></View>
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </Modal>
                { currentTest ?
                    <ScrollView style={styles.scrollContainer}>  
                        <Text style={styles.questionText}>
                            {'\t\t'+currentTest.question}
                        </Text>
                        <View style={styles.imageContainer}>
                            { currentTest.imageRef !== 'undefined' ?
                                <Image
                                    style={styles.image}
                                    source={{uri: currentTest.image}}
                                ></Image>    
                                :
                                <View></View>
                            }
                        </View>
                        { radioButtonsData ?
                            <RadioButton
                                textStyle={styles.radioText}
                                icon={<Icon name="check-circle" size={25} color="#00bfff" />}
                                activeColor={'#00BFFF'}
                                deactiveColor={'#999999'}
                                data={radioButtonsData}
                                selectedBtn={(e) => {
                                    console.log('testDataIndex: ', testDataIndex);
                                    console.log('gradeSum', gradeSum);
                                    setSelectedValue(e.value);
                                    setGrade(e.index);
                                }}
                            />
                            :
                            <View></View>
                        }
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => {
                                    if (selectedValue) {
                                        if (testDataIndex === testData.length - 1) {
                                            addUserData();

                                            setGradeSum(gradeSum + grade);

                                            setModalMessage(
                                                'Obrigado por responder todas as questões, sua nota inicial foi ' 
                                                + gradeCalculated(gradeSum+grade).finalGradeMessage
                                                );
                                            
                                            setModalVisible(!modalVisible);
                                        } else {
                                            console.log('grade: ', grade);

                                            setGradeSum(gradeSum + grade);
                                        
                                            console.log('gradeSum: ', gradeSum);

                                            setSelectedValue(null);

                                            addUserData();
                                            
                                            shiftTestData();
                                        }
                                    } else {
                                        setModalMessage('Por favor selecione uma alternativa...');
                                        
                                        setModalVisible(!modalVisible);
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    :
                    <ActivityIndicator size="large" color="#00BFFF" />
                }
            </SafeAreaView>
        );
    }
    
    return(
        <SafeAreaView style={{
            flex:1, 
            justifyContent:'center', 
            alignItems:'center'
        }}>
            <ActivityIndicator
                color='#21aff0'
                size='large'
            />
        </SafeAreaView>
    );
}