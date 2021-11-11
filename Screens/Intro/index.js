import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';

export default function Intro({navigation}) {

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid)
                navigation.navigate('Menu', { userId: user.uid })
            } 
        });
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Vivamus sed dui in turpis fringilla faucibus sed at
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log('Apertado');
                        navigation.navigate("Init");
                    }}
                >
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}