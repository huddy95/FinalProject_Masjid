import React, {Component} from 'react';
import { Text, View, ListView} from 'react-native';
import {  Fab, Icon, Container} from 'native-base';
import { db } from './../services/db';



const styles = require('./../app/style');

class ListQuestionsScreen extends Component {

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
                <View style={styles.li}>
                    <Text style={styles.liText}>{questions.message}</Text>
                </View>
            )
    }

    componentDidMount(){
        //listen for firebase update
        this.listenForQuestions(this.questionRef);
      }
    
  
     
    render(){

        const {navigation} = this.props;
        const eventKey = navigation.getParam('eventKey');

            return(
                <Container>
                    <ListView dataSource ={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={this.renderRow}>
    
                    </ListView>

                    <Fab
                        active={true}
                        direction="up"
                        containerStyle={{}}
                        style= {{backgroundColor:'#5067FF'}}
                        position="bottomRight"
                        onPress={ ()=>this.props.navigation.navigate('CreateQuestion',{eventKey})}>
                        <Icon name="add" />
                    </Fab>
                </Container>
                    
                   
               
            ) 
    }
}

export default ListQuestionsScreen;