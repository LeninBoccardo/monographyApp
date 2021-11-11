import React, { useEffect, useState } from 'react';
import { 
    View, 
    Modal, 
    Text, 
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';

export default function Select({options, onChangeSelect, placeHolder}) {
    const [textPh, setTextPh] = useState(placeHolder);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        setTextPh(placeHolder)
    },[placeHolder]);
    
    return(
        <View>
            <TouchableOpacity 
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                <Text
                    style={styles.txt}
                    numberOfLines={1}
                >
                    {textPh}
                </Text>
                <MaterialIcon
                    name='chevron-down'
                    size={26}
                    color='#44f'
                />
            </TouchableOpacity>
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                        >
                            <MaterialIcon
                                name='chevron-left'
                                size={26}
                                color='#44f'
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}   