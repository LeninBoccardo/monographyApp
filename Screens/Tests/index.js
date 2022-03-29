import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';
import styles from './style';
import firebase from '@react-native-firebase/firestore'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tests({ navigation, route }) {
    const [userId, setUserId] = useState(route.params.userId)
    const [subjects, setSubjects] = useState();
    const [loading, setLoading] = useState(true);

    const getSubjects = () => {
        firebase()
            .collection('Subjects')
            .orderBy('order', 'asc')
            .get()
            .then((query) => {
                const list = []
                let grade = 0;
                query.forEach((doc) => {
                    list.push({...doc.data(), id: doc.id});
                })
                setSubjects(list);
                console.log('subjects: ', subjects)
                setLoading(false);
            })
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    useEffect(() => {
        getSubjects();
    }, []);

    if (loading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator
                    color='#21aff0'
                    size='large'
                />
            </SafeAreaView>
        );
    }

    return(
        <View style={styles.container}>
            { subjects ? 
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={subjects}
                    renderItem={( {item} ) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    console.log('pressed');
                                    console.log(item)
                                    
                                    navigation.navigate(
                                        'Test', {
                                            userId: userId, // route.params.userId
                                            subject: item.subject,
                                        }
                                    )
                                }}
                            >
                                <View style={styles.test}>
                                        <Text style={styles.testText}>
                                            <Text style={styles.testSubject}>{item.id}</Text>
                                        </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                :
                <ActivityIndicator
                    color='#21aff0'
                    size='large'
                />
            }
            
        </View>
    );
}