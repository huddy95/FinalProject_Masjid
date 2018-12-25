import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View,StatusBar, ListView,TouchableHighlight,Modal } from 'react-native';

const styles = require('./../app/style');

class HomeScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        )
    }
}

export default HomeScreen;