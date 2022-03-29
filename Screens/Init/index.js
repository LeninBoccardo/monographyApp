import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,  
    Modal,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import styles from './style';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import PickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';

 
export default function Init({ navigation }) {

    const [openAgeModal, setOpenDateModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const [dateMessage, setDateMessage] = useState('Selecione a data');
    const [gender, setGender] = useState(''); 
    const [degree, setDegree] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [checkDate, setCheckDate] = useState(date);
    const [intro, setIntro] = useState(false);
    const [messagesIndex, setMessagesIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkUser = () => {
            try {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        navigation.navigate('InitTest', 
                        { userId: user.uid })
                    } else {
                        setLoading(false)
                        setIntro(true)
                    }
                });
            } catch (error) {
                console.log('CheckUser:', error);
            }
        }

        checkUser();
    },[]);

    
    const addUser = async () => {
        await auth()
            .signInAnonymously()
            .then((userCredential) => {
                
                setUserId(userCredential.user.uid)

                console.log(userId)
                
                try {
                    firestore()
                        .collection('UsersInfo')
                        .doc(userCredential.user.uid)
                        .set({
                            initTests: false,
                            grade: 0,
                        })  
                } catch (error) {
                    console.log('firestoreUser: ', error);
                }
            })
            .then(() => navigation.navigate(
                'InitTest', 
                { userId: userId }
            ))
    };

    const messages = [
        'Seja bem-vindo ao App, é um prazer tê-lo por aqui!',
        'Será uma honra poder lhe ajudar a conscientizar-se sobre a Engenharia Social!',
        'Antes de prosseguir é interessante realizar alguns testes para entender um pouco sobre seu conhecimento atual sobre Engenharia Social.',
        'Ao final da realização será atribuida uma nota total com base nas respostas dadas', 
        'Fique tranquilo essa nota é bem subjetiva e utilizada apenas para fins de comparação.',
        'E não fique aflito caso sua nota seja baixa, você está aqui exatamente para mudar essa situação. 😄',
    ]

    // if (intro) {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    {messages[messagesIndex]}
                </Text>
            </View>
            <View style={styles.infoButtonContainer}>
                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => {
                        if(messagesIndex < messages.length-1) {
                            setMessagesIndex(messagesIndex+1);
                        } else {              
                            setLoading(true);
                            addUser();
                        }
                    }}
                >
                    <Text style={styles.infoButtonText}>
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    // }

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#21aff0" />
            </SafeAreaView>
        )
    }

    // return(
    //     <SafeAreaView style={styles.container}>
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //                 setModalVisible(!modalVisible);
    //             }}
    //         >
    //             <View style={styles.centeredView}>
    //             <View style={styles.modalView}>
    //                 <Text style={styles.modalText}>Por favor preencha todos os campos</Text>
    //                 <TouchableOpacity
    //                 style={[styles.button, styles.buttonClose]}
    //                 onPress={() => setModalVisible(!modalVisible)}
    //                 >
    //                 <Text style={styles.textStyle}>OK</Text>
    //                 </TouchableOpacity>
    //             </View>
    //             </View>
    //         </Modal>
    //         <View style={styles.initContainer}>
    //             <Text style={styles.infoText}>
    //                 Insira as informações abaixo
    //             </Text>
    //         </View>
    //         <View style={styles.inputBox}>
    //             <Text style={styles.inputLabel}>
    //                 Data de nascimento
    //             </Text>
    //             <View style={styles.dateButtonContainer}>
    //                 <TouchableOpacity
    //                     onPress={() => setOpenDateModal(true)}
    //                 >
    //                     <Text style={[styles.infoButtonText, {fontSize:18}]}>
    //                         {dateMessage}
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <DatePicker
    //                 modal
    //                 locale='pt-br'
    //                 mode='date'
    //                 maximumDate={new Date()}
    //                 open={openAgeModal}
    //                 date={date}
    //                 onConfirm={(value) => {
    //                     setOpenDateModal(false);
    //                     setDate(value);
    //                     console.log(value);
    //                     setDateMessage(value.toLocaleDateString('pt-br'));
    //                 }}
    //                 onCancel={() => {
    //                     setOpenDateModal(false)
    //                 }}
    //             />

    //             <Text style={styles.inputLabel}>
    //                 Gênero
    //             </Text>
    //             <View style={styles.pickerView}>
    //                 <PickerSelect
    //                     placeholder={{label: 'Selecione o gênero', value: null, color: '#000'}}
    //                     style={styles.pickerStyle}
    //                     onValueChange={(value) => {
    //                         setGender(value);
    //                         console.log(value);
    //                     }}
    //                     items={[
    //                         { label: 'Masculino', value: 'male' },
    //                         { label: 'Feminino', value: 'female' },
    //                     ]}
    //                 />
    //             </View>
    //             <Text style={styles.inputLabel}>
    //                 Escolaridade
    //             </Text>
    //             <View style={styles.pickerView}>
    //                 <PickerSelect
    //                     placeholder={{label: 'Selecione a escolaridade', value: null}}
    //                     style={styles.pickerStyle}
    //                     onValueChange={(value) => {
    //                         setDegree(value);
    //                         console.log(value)
    //                     }}
    //                     items={[
    //                         { label: 'Fundamental Incompleto', value: 'ips' },
    //                         { label: 'Fundamental Completo', value: 'cps' },
    //                         { label: 'Médio Incompleto', value: 'ihs' },
    //                         { label: 'Médio Completo', value: 'chs' },
    //                         { label: 'Graduação Incompleta', value: 'ic' },
    //                         { label: 'Graduação Completo', value: 'cc' },
    //                         { label: 'Mestrado', value: 'ma' },
    //                         { label: 'Doutorado', value: 'phd' },
    //                     ]}
    //                 />
    //             </View>
    //         </View>
    //         <View style={styles.infoButtonContainer}>
    //             { date === checkDate || degree === '' || gender === '' ?
    //                 <TouchableOpacity
    //                     style={styles.infoButton}
    //                     onPress={() => setModalVisible(true)}
    //                 >
    //                     <Text style={styles.infoButtonText}>Continuar</Text>
    //                 </TouchableOpacity>
    //                 :
    //                 <TouchableOpacity
    //                     style={styles.infoButton}
    //                     onPress={() => {
    //                         addUser();
    //                     }}
    //                 >
    //                     <Text style={styles.infoButtonText}>Continuar</Text>
    //                 </TouchableOpacity>    
    //             }
    //         </View>
    //     </SafeAreaView>
    // );
};
