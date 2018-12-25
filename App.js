/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View,StatusBar, ListView,TouchableHighlight,Modal } from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import ListQuestionsScreen from './Screens/ListQuestionsScreen';
import EventScreen from './Screens/EventScreen';


const styles = require('./app/style');
console.disableYellowBox = true;


const RootStack = createStackNavigator({
  Question : ListQuestionsScreen,
  Event: EventScreen
  },
  {
    initialRouteName: 'Event'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return(
      <AppContainer />
    );
  }
}

