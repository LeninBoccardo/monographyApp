import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Modal, 
    SafeAreaView, 
    ActivityIndicator,
    BackHandler, 
    Alert,
    ScrollView,
} from 'react-native';
import styles from './style';

export default function Menu({ navigation, route }) {
    const buttonsDesc = [
        "Este botão leva aos módulos disponíveis",
        "Este botão leva a seção de testes",
        "Este botão exibe o histórico dos testes, além do número de erros e acertos",
        "Este botão leva a seção de dúvidas",
    ];
    const [textModal, setTextModal] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Espere!", "Você tem certeza que deseja fechar o aplicativo?", [
                {
                    text: "NÃO",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "SIM", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
          
        setLoading(false);
        return () => backHandler.remove();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ActivityIndicator 
                    size="large" 
                    color="#21aff0" 
                />
            </SafeAreaView>
        );
    }

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
                        <Text style={styles.modalText}>{textModal}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Ok!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity 
                style={styles.menuButton}
                onLongPress={() => {
                    setTextModal(buttonsDesc[0])
                    setModalVisible(true)
                }}
                onPress={() => {
                    navigation.navigate("Modules", { userId: route.params.userId });
                }}
            >
                <Text style={styles.textButton}>Módulos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.menuButton}
                onLongPress={() => {
                    setTextModal(buttonsDesc[1])
                    setModalVisible(true)
                }}
                onPress={() => {
                    navigation.navigate("Tests", { userId: route.params.userId });
                }}
            >
                <Text style={styles.textButton}>Testes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.menuButton}
                onLongPress={() => {
                    setTextModal(buttonsDesc[2])
                    setModalVisible(true)
                }}
                onPress={() => {
                    navigation.navigate("History", { userId: route.params.userId });
                }}
            >
                <Text style={styles.textButton}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.menuButton}
                onLongPress={() => {
                    setTextModal(buttonsDesc[3])
                    setModalVisible(true)
                }}
                onPress={() => {
                    navigation.navigate("Questions", { userId: route.params.userId });
                }}
            >
                <Text style={styles.textButton}>Dúvidas</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}