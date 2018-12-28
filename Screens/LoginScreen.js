import React, { Component } from 'react';
import {Platform, StyleSheet, View,Alert} from 'react-native';
import { Container, Text, Content, Form, Item, Input, Label,Button } from 'native-base';
import {firebaseApp} from './../services/db';
import console from 'console';


export default class LoginScreen extends Component {
    static navigationOptions = {
        title:"Masjid 2 U",
        headerStyle: {
          backgroundColor: '#2377ff'
        }
      };

      constructor(props){
          super(props)

          this.state = ({
              email:'',
              password:''
          });
      }

      loginUser = (email,password) =>{
          firebaseApp.auth().signInWithEmailAndPassword(email,password).then(function(user){
            Alert.alert('Success!',
            'You have logged in!',
            [
                {text: 'OK', style:'cancel'}
            ],
            { cancelable:false });
          },
          
          this.props.navigation.navigate('Event'))
      }

  render() {
    return (
      <Container>
       
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email)=> this.setState({email})}
               />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
               onChangeText={(password)=> this.setState({password})}
              />
                    
            </Item>

            <Button full rounded style={{marginTop:10}}
            success
            onPress={()=>this.loginUser(this.state.email,this.state.password)} >
                        <Text
                            style={{color:"white"}}>Login</Text>
            </Button>

            <Button full rounded style={{marginTop:10}}
            primary 
            onPress={()=>this.props.navigation.navigate('UserEvent')}>
                        <Text
                            style={{color:"white"}}>Guest</Text>
            </Button>

            
          </Form>
        
      </Container>
    );
  }
}