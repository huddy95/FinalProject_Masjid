/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View,StatusBar, ListView,TouchableHighlight,Modal } from 'react-native';
import Toolbar from './../app/components/Toolbar/Toolbar';
import AddButton from './../app/components/AddButton/AddButton';

import { db } from './../services/db';



const styles = require('./../app/style');

//console.disableYellowBox = true;

class EventScreen extends Component {

  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      text:'',
      itemDataSource:ds,
      modalVisible:false
    }

    this.itemsRef = this.getRef().child('event');

    this.renderRow = this.renderRow.bind(this);
 
  }

  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }

  getRef(){
    return db.ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    
    itemsRef.on('value', (snap)=>{
      let items = [];

      snap.forEach((child) => {
        items.push({
          name:child.val().name,
          date:child.val().date,
          _key:child.key
        });
      });
      this.setState({
        itemDataSource:this.state.itemDataSource.cloneWithRows(items)
      });
      
    });

    
  }


  pressRow(event){
    this.props.navigation.navigate('Question',{eventKey:event._key});
  }

  renderRow(event){
    return (
      <TouchableHighlight onPress = {() => {
        this.pressRow(event);
      }}>

      <View style={styles.li}>
      <Text style={styles.liText}>{event.name}</Text>
      
      </View>

      </TouchableHighlight>
    )
  }

  addItem(){
    this.setModalVisible(true);
  }

  render() {
    return (
      <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Toolbar title="Post Question" />
              <TextInput value={this.state.text}
              placeholder="Ask Question"
              onChangeText = {(value) => this.setState({text:value}) }/>

              <TouchableHighlight
                onPress={() => {
                  this.itemsRef.push({name:this.state.text});
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Post Question</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Toolbar title="Event List" />
        <ListView
          dataSource = {this.state.itemDataSource}
          renderRow = {(this.renderRow)}
          /> 

          <AddButton onPress={this.addItem.bind(this)} title= "Post Question"></AddButton>
       
      </View>
    );
  }
}

export default EventScreen;


