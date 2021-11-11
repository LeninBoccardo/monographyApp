import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    KeyboardAvoidingView, // Teclado move o conteudo da tela para se adaptar
    Platform
} from 'react-native';
import styles from '../Login/style';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Test from '../../config/testClass';


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigation.navigate('Task', { userId: userCredential.user.uid })
                console.log('User account signed in!');
                console.log(userCredential.user.uid);
            })
            .catch(error => {
                setErrorLogin(true);

                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };

    const createAnomUser = () => {
        auth()
            .signInAnonymously()
            .then((userCredential) => {
                console.log(userCredential.user.uid);
                navigation.navigate('Task', { userId: userCredential.user.uid })
            })
            .catch((error) => {
                console.error(error);
            })
    };

    useEffect(() => {
        //auth().signOut()
        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid)
                navigation.navigate('Task', { userId: user.uid })
            } 
        });
    }, []);
    
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email..."
                keyboardType="default"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            { errorLogin === true ?
                <View style={styles.contentAlert}>
                    <MaterialIcons
                        name='alert-circle'
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Invalid e-mail or password</Text>
                </View>
            :
                <View>
                </View>
            }
            { email === "" || password === "" ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonLogin}
                    // onPress={loginFirebase}
                >
                    <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase}
                >
                    <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
            }
            <Text style={styles.registration}>
                Don't have an account?
                <Text 
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate("New User")}
                >
                    Click here
                </Text>
            </Text>
        </KeyboardAvoidingView>
    )
}