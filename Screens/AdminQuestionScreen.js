import React, {Component} from 'react';
import { Text, View, ListView,TouchableHighlight,Alert} from 'react-native';

import { db } from './../services/db';



const styles = require('./../app/style');

class AdminQuestionScreen extends Component {

    static navigationOptions = {
        title:"Question List",
        headerStyle: {
          backgroundColor: '#2377ff'
        },
        
      };
    constructor(){
        super();
        
        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
        this.state = {
            dataSource:dataSource,

          }
          this.questionRef = this.getRef().child('questions');
          this.renderRow = this.renderRow.bind(this);
    }

    getRef(){
        return db.ref();
    }

  
    listenForQuestions(questionRef){

        const {navigation} = this.props;
        const eventKey = navigation.getParam('eventKey');

        questionRef.orderByChild("eventID").equalTo(eventKey).on('value',(dataSnapshot)=>{
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
        
        return (
            <TouchableHighlight
            onPress = {() => {
                this.pressRow(questions);
             }}>
                <View style={styles.li}>
                    <Text style={styles.liText}>{questions.message}</Text>
                </View>
            </TouchableHighlight>
            )
    }

    componentDidMount(){
        //listen for firebase update
        this.listenForQuestions(this.questionRef);
      }
    
      pressRow(questions){
        Alert.alert('Caution! ',
            'Is the Question answered?',
        [
            {text: 'Confirm', onPress: () => {this.questionRef.child(questions._key).remove()}},
            {text: 'Close',style: 'cancel'}
        ],
        { cancelable:false });
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

export default AdminQuestionScreen;