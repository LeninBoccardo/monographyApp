import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    FlatList,
    SectionList, 
    ScrollView, 
    Image,
    ActivityIndicator,
    TouchableOpacity, 
} from 'react-native';
import styles from './style';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export default function Module({ navigation, route }) {
    const [moduleData, setModuleData] = useState(null);
    const [moduleId, setModuleId] = useState(route.params.docId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getModuleData = async () => {
            try {
                await firebase()  
                    .collection('Modules')
                    .doc(moduleId)
                    .collection('Content')
                    .orderBy('order', 'asc')
                    .get()
                    .then(query => {
                        const data = []

                        query.forEach(doc => {
                            data.push({...doc.data(), id: doc.id});
                        });

                        console.log("Data", data);

                        (async () => {
                            for (let index = 0; index < data.length; index++) {
                                if (data[index].image === 'undefined') {
                                    data[index].imageRef = data[index].image;
                                } else {
                                    await storage()
                                        .ref(data[index].image)
                                        .getDownloadURL()
                                        .then(url => {
                                            data[index].imageRef = url;
                                            console.log('data: ', data);
                                        });
                                }
                            }
                            setModuleData(data);
                        })();

                        console.log("Module Data", moduleData);
                    })
                    .then(() => setLoading(false));
            } catch (error) {
                console.log(error);
            }
        }

        getModuleData();
    },[]);


    //make a function that replace all three spaces for a new paragraph
    const replaceThreeSpaces = (text) => {
        return text.replace(/\s{3}/g, '\n\n\t\t\t\t');
    }
    
    const formatText = (text) => {
        return text.replace(/\s{3}/g, '\n\n\t\t\t\t');
    }

    const renderTitle = (title) => {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
        );
    }

    const renderImage = (image) => {
        return (
            <View style={styles.imageContainer}>
                { image ?
                    <Image
                        style={styles.image}
                        source={{uri: image}}
                    />
                    :
                    <ActivityIndicator size="large" color="#00bfff" />
                }
            </View>
        );
    }

    const renderText = (text) => {
        return (
            <View style={styles.textContainer}>
                <Text
                    style={styles.text}
                >
                    {'\t\t\t\t'+ formatText(text)}
                </Text>
            </View> 
        );
    }

    if (!loading) {
        return(
            <SafeAreaView style={styles.container}>
                { moduleData ?
                    <FlatList
                        data={moduleData}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.itemContainer}>
                                    { item.title === 'undefined' ?
                                        <View/>
                                        :
                                        renderTitle(item.title)
                                    }
                                    { item.image === 'undefined' ?
                                        <View>
                                            {renderText(item.text)}
                                        </View>
                                        :
                                        <View>
                                            { item.imageFirst ?
                                                <View>
                                                    {renderImage(item.imageRef)}
                                                    {renderText(item.text)}
                                                </View>
                                                :
                                                <View>
                                                    {renderText(item.text)}
                                                    {renderImage(item.imageRef)}
                                                </View>
                                            }
                                        </View>
                                    }
                                </View>
                            )
                        }}
                    /> 
                    :
                    <ActivityIndicator
                        color='#21aff0'
                        size='large'
                    />
                }
                <TouchableOpacity>  
                    <Text></Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex:1,  
                justifyContent:'center',
                alignItems:'center',
            }}  
        >
            <ActivityIndicator
                color='#21aff0'
                size='large'
            />
        </SafeAreaView>
    );
}