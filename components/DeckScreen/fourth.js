import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Root, Icon, Title, Thumbnail, Subtitle, Content, List, ListItem, Switch } from 'native-base';
//import '../DeckScreen/declare_modules.d.ts';
import {Platform, StatusBar} from 'react-native';
import { ActionSheet } from "native-base";
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";




var BUTTONS = [
  { text: "Delete", icon: "trash", iconColor: "#2c8ef4"},
  { text: "Copy", icon: "copy", iconColor: "#2c8ef4" },
  { text: "Edit", icon: "md-create", iconColor: "#2c8ef4"}
];

export class DeckDownload extends Component {
/**
  constructor(props) {
    super(props)
  }
  
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  makeaction(value) {
    console.log("notes tapped!");
    if (value == 1) {
      console.log("value 0!");
      this.showDialog();
    }
  }
  _showbottomsheet() {
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "Possible actions"
      },
      (buttonValue) => {this.makeaction(buttonValue)}
    )
  }**/

  render() {
    return (
      <Root>  
      <ScrollView style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.push('DownloadDeckList')}}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>Geography</Title>
          </Body>
          <Right/>
        </Header>
        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://banner2.kisspng.com/20180420/ygw/kisspng-sawtry-village-academy-sphere-circle-geography-fon-fen-bizi-english-alphabet-5ad9b11c40c317.3646598515242160922653.jpg'}}
            />
            <Text style = {{marginLeft: 10, marginTop: 15, fontSize: 16, color: 'black'}}>
                Geography
            </Text>
            <Button iconLeft style={{position: 'absolute', right: 10, width: 120, backgroundColor: '#4169E1'}}>
                <Icon name='download' />
                <Text style={{position: 'absolute', left: 40, fontSize: 15, color: 'white'}}>Download</Text>
            </Button>
        </View> 
        <View style={{marginTop:30}}>
        <Text style={{marginTop:30, textAlign: 'center'}}>
            A deck that help you learn the world's places{"\n"} and their main characteristics
        </Text>
        <View style={{marginTop:10}}>
        <Text style={{marginTop:30, marginLeft:10, fontSize:14}}>
           Card samples:
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
            <Image
                style={{width: 100, height: 140, borderColor: 'green'}}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WRY36wqVRl1H_FbCnvlvlbAeCaI4iO0UAgiObi54xR1MLFjp'}}
            />
            <Image
                style={{width: 100, height: 140, marginLeft: 15}}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WRY36wqVRl1H_FbCnvlvlbAeCaI4iO0UAgiObi54xR1MLFjp'}}
            />
            <Image
                style={{width: 100, height: 140, marginLeft: 15}}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-WRY36wqVRl1H_FbCnvlvlbAeCaI4iO0UAgiObi54xR1MLFjp'}}
            />
        </View> 
        <View style={{marginTop:10}}>
        <Text style={{marginTop:15, marginLeft:10, fontSize:14}}>
           Reviews:
        </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
            <Image
                style={{width: 35, height: 35}}
                source={{uri: 'http://caringestateliquidators.com/wp-content/uploads/2015/02/my-profile-pic-circular2.png'}}
            />
            <Text style = {{marginLeft: 10, marginTop: 5}}>
                Smil2013: Great deck!
            </Text>
        </View>
        <View  style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
        <Image
                style={{width: 35, height: 35}}
                source={{uri: 'https://www.curaa.in/curaa/img/homepage/testimonial-1.png'}}
            />
            <Text style = {{marginLeft: 10, marginTop: 5}}>
                Gelf94: Great deck GG
            </Text>
        </View>
        </View>
        </View>
      </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          backgroundColor: '#FFFFFF'/**,
          ...Platform.select({
              android: {
                  marginTop: StatusBar.currentHeight
              }
          })**/

      },
  actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})


