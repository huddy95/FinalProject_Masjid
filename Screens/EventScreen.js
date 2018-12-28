/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text,  View, ListView,TouchableHighlight, Alert,Button} from 'react-native';
import {  Fab, Icon, Container} from 'native-base';
import { db } from './../services/db';

const styles = require('./../app/style');

//console.disableYellowBox = true;

class EventScreen extends Component {


  static navigationOptions = {
    title:"Event List",

      headerLeft:null,
    headerStyle: {
      backgroundColor: '#2377ff'
    }
  };

  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      active:'true',
      text:'',
      itemDataSource:ds,
      modalVisible:false
    }

    this.itemsRef = this.getRef().child('event');

    this.renderRow = this.renderRow.bind(this);
 
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

  pressRowLong(event){
    Alert.alert('Event Info :',
            `Event name: ${event.name}
            Event date: ${event.date}`,
            [
                {text: 'Delete Event', onPress: () => {this.itemsRef.child(event._key).remove()}},
                {text: 'Close',style: 'cancel'}
            ],
            { cancelable:false });
  }
  pressRow(event){
    this.props.navigation.navigate('AdminQuestion',{eventKey:event._key});
  }

  renderRow(event){
    return (
      <TouchableHighlight 
        onLongPress = {()=>{
          this.pressRowLong(event)}}
        onPress = {() => {
        this.pressRow(event);
      }}>

      <View style={styles.li}>
      <Text style={styles.liText}>{event.name}</Text>
      
      </View>

      </TouchableHighlight>
    )
  }


  render() {
    return (
      <Container>
        <ListView
          dataSource = {this.state.itemDataSource}
          renderRow = {(this.renderRow)}
          /> 

          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style= {{backgroundColor:'#5067FF'}}
            position="bottomRight"
            onPress={ ()=>this.props.navigation.navigate('CreateEvent')}>
            <Icon name="calendar" />
          </Fab>
      </Container>
      
       
  
    );
  }
}

export default EventScreen;


