import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    FlatList, 
    ActivityIndicator, 
    TouchableOpacity
} from 'react-native';
import styles from './style';
import firebase from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function History({ navigation, route }) {
    const [userId, setUserId] = useState(route.params.userId);
    const [data, setData] = useState(null);
    const [gotRightList, setGotRightList] = useState([]);
    const [initGrade, setInitGrade] = useState(0.0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserGrade = async () => {
            try {
                await firebase()
                    .collection('UsersInfo')
                    .doc(userId)
                    .get()
                    .then(doc => {
                        setInitGrade(doc.data().grade);
                    })
                    .then(() => getUserHistory());
            } catch (error) {
                console.log('getUserGrade ', error);
            }
        }

        const getUserHistory = async () => {
            try {
                firebase()
                    .collection('UsersInfo')
                    .doc(userId)
                    .collection('Tests')
                    .orderBy('completionDate', 'asc')
                    .onSnapshot((query) => {
                        const list = [];
                        const gotRightList = [];
                        query.forEach((doc) => {
                            list.push({...doc.data()});
                            gotRightList.push(doc.data().gotRight);
                        })

                        setGotRightList(gotRightList);
                        setData(list);
                        setLoading(false)
                    })
            } catch (error) {
                console.log('getUserHistory ', error);
            }
        }

        getUserGrade();
    } , []);

    const gradeCalculated = (arr) => {
        if (arr.length === 0) {
            return 0;
        }
        const avg = (arr.reduce((a, b) => a + b, 0)) / arr.length;
        return (10*avg).toFixed(2);
    };

    const convertTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleDateString('pt-BR');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (loading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#21aff0"
                />
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.infoContainer}> 
                <Text style={styles.infoText}>
                    Nota inicial: <Text style={{color:'#0000ff'}}>{initGrade.toFixed(1)}</Text>
                </Text>
                <Text style={styles.infoText}>
                    Testes realizados: 
                    <Text style={{color:'#000'}}> {data?.length}</Text>
                </Text>
                <Text style={styles.infoText}>
                    Testes corretos: 
                    <Text style={{color:'green'}}> {data?.filter(item => item.gotRight).length}</Text>
                </Text>
                <Text style={styles.infoText}>
                    Nota atual: <Text style={{color:'#000'}}>{gradeCalculated(gotRightList)}</Text>
                </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>Assunto</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>Realização</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={styles.headerText}>Resultado</Text>
                </View>
                </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={( {item} ) => {
                    return (
                        <View style={styles.listContainer}> 
                            
                            <View style={styles.listItem}>
                                <Text style={styles.listText}>
                                    {capitalizeFirstLetter(item.subject)}
                                </Text>
                            </View>
                            
                            <View style={styles.listItem}>
                                <Text style={styles.listText}>
                                    {convertTimestamp(item.completionDate)}
                                </Text>    
                            </View>

                            <View style={styles.listItem}>
                                <Text style={styles.listText}>
                                    {item.gotRight? 
                                        <Icon
                                            name='check-circle-outline'
                                            size={20}
                                            color='green'
                                        /> 
                                        : 
                                        <Icon
                                            name='close-circle-outline'
                                            size={20}
                                            color='red'
                                        /> 
                                    }
                                </Text>

                            </View>

                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );
}