import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    Text, 
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import database from '../../config/firebase';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

export default function Task({navigation, route}) {
    const [task, setTask] = useState();
    
    const deleteTask = (id) => {
        database.collection(route.params.userId).doc(id).delete();
    };

    useEffect(() => {
        database.collection(route.params.userId).onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list);
        })
    }, []);

    return(
        <View style={styles.Container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={task}
                renderItem={( { item } ) => {
                    return (
                        <View style={styles.Tasks}>
                            <TouchableOpacity 
                                style={styles.DeleteTask}
                                onPress={() => deleteTask(item.id)}>
                                <FontAwesome5
                                    name="star"
                                    size={23}
                                    color="#f92e6a"
                                    solid
                                />
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        description: item.description,
                                        // userId: route.params.userId
                                    })
                                    }
                                }
                            >
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
            />            
            <TouchableOpacity 
                style={styles.ButtonNewTask}
                onPress={() => navigation.navigate("New Task", { userId: route.params.userId })}>
                    <Text style={styles.IconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
};