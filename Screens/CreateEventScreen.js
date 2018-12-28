import React, {Component} from 'react';
import {Text, Alert } from 'react-native';
import { Container , Content, DatePicker, Input, Item, Button } from 'native-base';

import { db } from './../services/db';

export default class CreateEventScreen extends Component {

    static navigationOptions = {
        title:"Create New Event",
        headerStyle: {
          backgroundColor: '#2377ff'
        }
      };

    constructor(props){
        super(props);
        this.state = {
            event:"",
            chosenDate: new Date(),
            date:""};
        this.setDate = this.setDate.bind(this);
        this.state.date = this.state.chosenDate.toString().substr(4,12);

        this.eventRef = this.getRef().child('event');

    }

    componentWillMount(){
        this.getEvent(this.eventRef);
    }

    componentDidMount(){
        this.getEvent(this.eventRef);
    }

    getRef(){
        return db.ref();
    }

    getEvent(eventRef){
        eventRef.on('value',(snap)=>{
            let events = [];
            snap.forEach((child)=>{
                events.push({
                    name:child.val().name,
                    date:child.val().date,
                    _key:child.key
                });
            });
        })
    }


    setDate(newDate){
        this.setState({ chosenDate: newDate});
    }


    handleSubmit(){

        this.eventRef.push({name:this.state.event,
            date:this.state.date
        });
        Alert.alert('Success!',
            'You have created a new Event!',
            [
                {text: 'OK', onPress: () => {this.props.navigation.navigate('Event')}},
            ],
            { cancelable:false });
    }

    render(){
        return(
            <Container>

                <Content padder>
                    <Item regular>
                        <Input
                            value={this.state.event}
                            placeholder='Event Name'
                            onChangeText={(value)=> this.setState({event:value})} />
                    </Item>

                    <DatePicker
                        defaultDate={new Date(2018,12,28)}
                        minimumDate={new Date(2018,12,1)}
                        maximumDate = {new Date(2019,12,31)}
                        locale={"en"}
                        timeZoneOffsetInMinutes= {undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select Event Date"
                        textStyle= {{color: "green"}}
                        placeHolderTextStyle={{color: "blue"}}
                        onDateChange={this.setDate}>

                    </DatePicker>

                    <Text style={{padding:10}}>
                        Date : {this.state.chosenDate.toString().substr(4,12)}
                    </Text>

                    <Button full onPress={this.handleSubmit.bind(this)} >
                        <Text
                            style={{color:"white"}}>Create Event</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}