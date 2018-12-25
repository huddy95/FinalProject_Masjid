/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
const styles = require('../../style');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class Toolbar extends Component {
  render() {
    return (
      
      <View>
      <StatusBar 
        backgroundColor="#40d690"
        barStyle="light-content"/>
        <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>
          {this.props.title}
          </Text>
        </View>
      
      
    </View>
    );
  }
}
