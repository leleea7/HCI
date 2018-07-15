import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Root, Icon, Title, Thumbnail, Subtitle, Content, List, ListItem, Switch } from 'native-base';
//import '../DeckScreen/declare_modules.d.ts';
import {Platform, StatusBar} from 'react-native';
import { ActionSheet } from "native-base";
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";
import DeckDownload from "./fourth"




var BUTTONS = [
  { text: "Delete", icon: "trash", iconColor: "#2c8ef4"},
  { text: "Copy", icon: "copy", iconColor: "#2c8ef4" },
  { text: "Edit", icon: "md-create", iconColor: "#2c8ef4"}
];

export class DownloadDeckList extends React.Component {
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
            <Button transparent onPress={() => {this.props.navigation.push('DeckScreen')}}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>Download Decks</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Most Downloaded</Text>
            </ListItem>                    
            <ListItem onPress={() => {this.props.navigation.push('DeckDownload')}}>
              <Thumbnail style={{width: 40, height: 40}} source={{ uri: 'https://banner2.kisspng.com/20180420/ygw/kisspng-sawtry-village-academy-sphere-circle-geography-fon-fen-bizi-english-alphabet-5ad9b11c40c317.3646598515242160922653.jpg' }} />
              <Text style = {{ marginLeft:10, fontWeight: 'bold'}}>Geography</Text>
            </ListItem>
            <ListItem>
            <Thumbnail style={{width: 40, height: 40}} source={{ uri: 'https://i.pinimg.com/736x/f4/03/2a/f4032a65d570ca519926317e63413b44--visual-metaphor-paper-packaging.jpg' }} />
              <Text style = {{ marginLeft:10, fontWeight: 'bold'}}>History</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>Recommended</Text>
            </ListItem>  
            <ListItem>
            <Thumbnail style={{width: 45, height: 45}} source={{ uri: 'https://www.mytcscareer.com/wp-content/uploads/2017/05/french.png' }} />
              <Text style = {{ marginLeft:10, fontWeight: 'bold'}}>French Words</Text>
            </ListItem>
            <ListItem>
            <Thumbnail style={{width: 40, height: 40}} source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/15/53/football-soccer-ball-circle-icon-vector-7971553.jpg' }} />
              <Text style = {{ marginLeft:10, fontWeight: 'bold'}}>Football players</Text>
            </ListItem>
            <ListItem>
            <Thumbnail style={{width: 40, height: 40}} source={{ uri: 'https://www.outsource3dmodeling.com/wp-content/uploads/2016/07/architecture_icon-1-300x300.png' }} />
              <Text style = {{ marginLeft:10, fontWeight: 'bold'}}>Architecture</Text>
            </ListItem>
          </List>
        </Content>
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