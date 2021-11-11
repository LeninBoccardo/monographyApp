import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButtons = (
    {
        options=[], 
        horizontal=false, 
        onChangeSelect, 
        selected
    }
    ) => {
    return(
        <View style={horizontal ? styles.horizontal : styles.vertical}>
            {
                options.map((opt, index) => (
                    <TouchableOpacity 
                        onPress={() => onChangeSelect(opt)}
                        style={
                            styles.optContainer,
                            {
                                marginLeft: horizontal ? 10 : 0,
                                marginTop: horizontal ? 0 : 10
                            }
                        }
                    >
                        <View style={styles.outlineCircle}>
                            {selected === index && <View style={styles.innerCircle}/>}
                        </View>
                        <Text 
                            style={styles.txt, 
                                {color: selected === index ? '#444' : '#777'}}
                        >
                            {opt}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>    
    );
};

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optContainer: {
        flexDirection: 'row',
        alignItems: 'center',  
    },
    outlineCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: '#777',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: '#000',
        backgroundColor: '#000',
        borderWidth: 2,
    },
    txt: {
        fontSize: 14,
        marginLeft: 4,
    },  
});

export default RadioButtons;