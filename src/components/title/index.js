import React from "react";
import { Text, View } from 'react-native';
import styles from './style.js'

export default function Title(){

    return(
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>Agendamento App</Text>
        </View>
    )
}