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

    const formatText = (text) => {
        return text.replace('   ', '\n\t\t\t\t');
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
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.titleText}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    { item.image === 'undefined' ?
                                        <View style={styles.textContainer}>
                                            <Text
                                                style={styles.titleText}
                                            >
                                                {item.text}
                                            </Text>
                                        </View>
                                        :
                                        <View>
                                            { item.imageFirst ?    
                                                <View style={styles.contentContainer}>
                                                    <View style={styles.imageContainer}>
                                                        { item.imageRef ?
                                                            <Image
                                                                style={styles.image}
                                                                source={{uri: item.imageRef}}
                                                            />
                                                            :
                                                            <ActivityIndicator size="large" color="#00bfff" />
                                                        }
                                                    </View>
                                                    <View style={styles.textContainer}>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {'\t\t\t\t'+ formatText(item.text)}
                                                        </Text>
                                                    </View>
                                                </View>
                                                :
                                                <View>
                                                    <View style={styles.textContainer}>
                                                        <Text
                                                            style={styles.text}
                                                        >
                                                            {'\t\t\t\t' + formatText(item.text)}  
                                                        </Text>
                                                    </View>
                                                    <View style={styles.imageContainer}>
                                                        { item.imageRef ?
                                                            <Image
                                                                style={styles.image}
                                                                source={{uri: item.imageRef}}
                                                            />
                                                            :
                                                            <ActivityIndicator size="large" color="#00bfff" />
                                                        }
                                                    </View>
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