import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import styles from './style';
import database from '../../config/firebase';


export default function Modules({ navigation, route }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        database
            .collection('Modules')
            .orderBy('order', 'asc')
            .onSnapshot((query) => {
                const list = [];
                query.forEach((doc) => {
                    list.push({
                        subject: doc.data().subject,
                        id: doc.id, 
                    }); 
                })
                setData(list);
                setLoading(false);
            })
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (loading) {
        return (
            <SafeAreaView
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <ActivityIndicator
                    size='large'
                    color='#21aff0'
                />
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate('Module', {
                                    docId: item.id,
                                    userId: route.params.userId,
                                })
                            }}
                        >
                            <View style={styles.module}>
                                    <Text style={styles.moduleText}>
                                        Módulo {item.order} - {capitalizeFirstLetter(item.subject)}
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    );
}