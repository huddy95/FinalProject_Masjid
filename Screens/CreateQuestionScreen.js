import React, {Component} from 'react';
import {Text,  ListView, Alert } from 'react-native';
import { Container , Form,Button, Textarea, Content } from 'native-base';
import { db } from './../services/db';

export default class CreateQuestionScreen extends Component{
    static navigationOptions = {
        title:"Ask a Question",
        headerStyle: {
          backgroundColor: '#2377ff'
        }
      };

      constructor(){
        super();
        
        const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
        this.state = {
            text:'',
            dataSource:dataSource,

          }
          this.questionRef = this.getRef().child('questions');
         
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

    handleSubmit(){

        const {navigation} = this.props;
        const eventKey = navigation.getParam('eventKey');
        
        this.questionRef.push({message:this.state.text,eventID:eventKey
        });
        Alert.alert('Success!',
            'You have posted a new Question!',
            [
                {text: 'OK', onPress: () => {this.props.navigation.navigate('Question')}},
            ],
            { cancelable:false });
    }


    componentDidMount(){
        //listen for firebase update
        this.listenForQuestions(this.questionRef);
      }
    render(){
        return(
            <Container>
                
                <Content padder>
                   <Form>
                    <Textarea value={this.state.text}
                    onChangeText={(value)=>this.setState({text:value})}
                        rowSpan={5} bordered placeholder="Enter your question here"/>
                   </Form>

                   <Button full onPress={this.handleSubmit.bind(this)} >
                        <Text
                            style={{color:"white"}}>Post Question</Text>
                    </Button>
                   
                </Content> 
                    
                
            </Container>
        );
    }
}