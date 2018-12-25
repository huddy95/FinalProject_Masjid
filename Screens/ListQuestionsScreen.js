import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View,StatusBar, ListView,TouchableHighlight,Modal } from 'react-native';

import { db } from './../services/db';
import { DataSnapshot } from '@firebase/database';


const styles = require('./../app/style');

class ListQuestionsScreen extends Component {
    constructor(){
        super();
        this.questionRef = db.ref();
        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
        this.state = {
            dataSource:dataSource
          }
          this.questionRef = this.getRef().child('questions');
          this.renderRow = this.renderRow.bind(this);
    }

    getRef(){
        return db.ref();
    }
    listenForQuestions(questionRef){
        questionRef.on('value',(dataSnapshot)=>{
            var questions = [];
            dataSnapshot.forEach((child)=>{
                questions.push({
                    message:child.val().message,
                    eventID:child.val().eventID,
                    _key:child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(questions) 
            });
        });

        
    }

    renderRow(questions){
        
        const {navigation} = this.props;
        const eventKey = navigation.getParam('eventKey');

        return (
                <View style={styles.container}>
                    <Text style={styles.liText}>{eventKey}</Text>
                </View>
            )
       /* if((questions.eventID) === eventKey){
            return (
                <View style={styles.container}>
                    <Text style={styles.liText}>{eventKey}</Text>
                </View>
            )
        }

        else {
            return (<View style={styles.container}>
                <Text style={styles.liText}>empty</Text>
            </View>)
        }*/
       
    }

    componentDidMount(){
        //listen for firebase update
        this.listenForQuestions(this.questionRef);
      }
    
  
     
    render(){

            return(
                <View style={styles.container}>
                    <ListView dataSource ={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={this.renderRow}>
    
                    </ListView>
                   
                </View>
            ) 
    }
}

export default ListQuestionsScreen;