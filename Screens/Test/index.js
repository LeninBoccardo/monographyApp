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
    RefreshControl,
} from 'react-native';
import styles from './style';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RadioButton from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Test({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [subject, setSubject] = useState(route.params.subject);
    const [collection, setCollection] = useState("Tests");
    const [testData, setTestData] = useState(null);
    const [radioButtonsData, setRadioButtonsData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [isDone, setIsDone] = useState();
    const [modalMessage, setModalMessage] = useState('');
    const [imageRef, setImageRef] = useState(null);
    // const [idsChecked, setIdsChecked] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
        
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const messages = [
        'Parabéns vc acertou, em voltar para escolher o mesmo ou um novo assundo',
        'Que pena, você errou, em voltar para escolher o mesmo ou um novo assundo',
        'Por favor escolha uma resposta...',
        'Parabéns vc já realizou todos os testes sobre este assunto, agora é hora de passar para o próximo, vamos lá'
    ];
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getRadioButtonsData = (data) => {
        try {
            const list = [];

            for (let index = 0; index < data.choices.length; index++) {
                list.push({
                    label: ('\t\t'+capitalizeFirstLetter(data.choices[index])),
                    value: data.choices[index],
                })
            }

            for (let i = list.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [list[i], list[j]] = [list[j], list[i]]
            }

            setRadioButtonsData(list);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const getFilteredTestData = async () => {
            try {
                await firebase()
                    .collection(collection)
                    .where('subject', '==', subject)
                    .get()
                    .then((querySnapshot) => {
                        const list = [];
                        
                        querySnapshot.forEach((doc) => {
                            list.push({...doc.data(), id: doc.id});
                        })

                        let randomNum = Math.floor(Math.random() * list.length);
                        
                        //console.log('list: ', list)
                        
                        // let ids = [];

                        // while (true) {
                        //     ids.push(list[randomNum].id);

                        //     checkIfTestIsDone(list[randomNum].id);
                            
                        //     if (isDone) {
                        //         compareIdLists(list, ids)
                                
                        //         if (idsChecked === 'equal') {
                        //             setModalMessage(messages[4]);
                        //             setModalVisible(true);
                        //             break;
                        //         }      
                            
                        //     } else {
                        //         break;
                        //     }

                        //     randomNum = Math.floor(Math.random() * list.length);
                        //     console.log('randomNum: ', randomNum)
                        //     console.log('list[randomNum].id: ', list[randomNum].id)
                        // }

                        setTestData(list[randomNum]);

                        console.log('list[randomNum]: ', list[randomNum])
                        
                        if (list[randomNum].imageRef !== 'undefined') {
                            try {
                                storage()
                                    .ref(list[randomNum].imageRef)
                                    .getDownloadURL()
                                    .then((url) => {
                                        console.log('url: ', url);
                                        setImageRef(url);
                                    })
                            } catch (error) {
                                console.log(error);
                            }
                        }

                        // setImageRef(ref);
                        // console.log('ImageRef:', imageRef)
                        getRadioButtonsData(list[randomNum]);
                    })
                    .then(() => setLoading(false))
            } catch (error) {
                console.log(error);
            }        
        }

        // const checkIfTestIsDone = (testId) => {
        //     console.log('Checking test isDone...'); 

        //     try {
        //         firebase()
        //             .collection('UsersInfo')
        //             .doc(route.params.userId)
        //             .collection('Tests')
        //             .doc(testId)
        //             .get()
        //             .then((query) => {
        //                 if (query.exists) {
        //                     setIsDone(true);

        //                 } else {
        //                     setIsDone(false);
        //                 }
        //             })
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        
        // const compareIdLists = (idsList, idsCompareList) => {                            
        //     console.log('Comparing Ids..')
            
        //     let list = [];
            
        //     for (let i = 0; i < idsList.length; i++) {
        //         list.push(idsList[i].id)
        //     }

        //     if (idsList.length !== idsCompareList.length) 
        //         return setIdsChecked('size');
            
        //     for (let i = 0; i < idsList.length; i++) {
        //         if (idsList[i] !== ids[i]) 
        //             return setIdsChecked('itens');
        //     }

        //     return setIdsChecked('equal');
        // }

        getFilteredTestData();
    }, []);

    const addUserData = () => {
        try {
            firebase()
                .collection('UsersInfo')
                .doc(route.params.userId)
                .collection('Tests')
                .doc(testData.id)
                .set({
                    userAnswer: selectedValue,
                    subject: testData.subject,
                    completionDate: firebase.Timestamp.fromDate(new Date()),
                    gotRight: (testData.choices[testData.correct] === selectedValue),
                })
                .then(() => {
                    console.log('Data Added')
                })
        } catch (error) {
            console.log(error);
        }
    };

    if (!loading) {
        return(
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {modalMessage}
                        </Text>
                        { !selectedValue ?
                            // (idsChecked === 'equal') ?
                            //     <View>
                            //         <TouchableOpacity
                            //             style={[styles.button, styles.buttonClose]}
                            //             onPress={() => {
                            //                 setModalVisible(!modalVisible)
                            //                 navigation.navigate('Tests', {
                            //                     userId: route.params.userId,
                            //                 })
                            //             }}
                            //         >
                            //             <Text style={styles.textStyle}>Vamos!</Text>    
                            //         </TouchableOpacity>
                            //     </View>
                            //     :
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
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigation.navigate('Tests', {
                                            userId: route.params.userId,
                                            subject: testData.subject,
                                        })
                                    }}
                                >
                                    <Text style={styles.textStyle}>Voltar</Text>
                                </TouchableOpacity>

                            </View>
                        }
                    </View>
                    </View>
                </Modal>
                <ScrollView 
                    style={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh()}
                        />
                    }
                >  
                    <View style={styles.imageContainer}>
                        { testData.imageRef !== 'undefined' ?
                            <Image
                                style={styles.image}
                                source={{uri: imageRef}}
                            ></Image>    
                            :
                            <View></View>
                        }
                    </View>
                    <Text style={styles.questionText}>
                        {'\t\t'+testData.question}
                    </Text>
                    {testData?
                        <RadioButton
                            textStyle={styles.radioText}
                            icon={<Icon name="check-circle" size={25} color="#00bfff" />}
                            activeColor={'#00BFFF'}
                            deactiveColor={'#999999'}
                            data={radioButtonsData}
                            selectedBtn={(e) => {
                                setSelectedValue(e.value);
                            }}
                        />
                        :
                        <View></View>
                    }
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => {
                                if (!selectedValue) {
                                    setModalVisible(true);
                                    setModalMessage(messages[2]);
                                } else {
                                    if ((testData.choices[testData.correct] === selectedValue)) {
                                        addUserData();
                                        setModalMessage(messages[0]);
                                        setModalVisible(true);
                                    } else {
                                        addUserData();
                                        setModalMessage(messages[1]);
                                        setModalVisible(true);
                                    }
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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