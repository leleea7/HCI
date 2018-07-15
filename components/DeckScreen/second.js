import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Root, Icon, Title, Thumbnail, Subtitle, Content, List, ListItem, Switch, Toast } from 'native-base';
//import '../DeckScreen/declare_modules.d.ts';
import {Platform, StatusBar} from 'react-native';
import { ActionSheet } from "native-base";
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";
import DeckScreen from "./index";
import DeckStorage from '../../Objects/DeckStorage';






var BUTTONS = [
  { text: "Delete", icon: "trash", iconColor: "#2c8ef4"},
  { text: "Copy", icon: "copy", iconColor: "#2c8ef4" },
  { text: "Edit", icon: "md-create", iconColor: "#2c8ef4"}
];

export class CreateDeck extends Component {

 constructor() {
    super()
    this.state = {
      deckname: '',
      deckdescription: '',
      flag: false
    };
  }

  _listofcards (deck) { 
      if (deck == 'NO-DECK') {
        return (<Text style = {{marginLeft: 10, marginTop: 125, textAlign: 'center', fontSize: 15}}> You don't have any cards yet.
        {"\n"} Tab on + to add new ones. </Text>);
      }
      else if (deck.cards.length > 0) {
      return deck.cards.map((card) => {
          return (
        <View>
        <Text style={{marginTop:7, marginLeft:5}}>
            Q: {card.question} {"\n"}
            A: {card.answer}
        </Text>
        <View style={{flexDirection: 'row', height: 1, marginTop:2}} backgroundColor='grey' >
        </View>
        </View>);
          });
        }
      else {
        return (<Text style = {{marginLeft: 10, marginTop: 125, textAlign: 'center', fontSize: 15}}> You don't have any cards yet.
         {"\n"} Tab on + to add new ones. </Text>);
      }
  }
  _descr(deck) {
    if (deck == 'NO-DECK') {
      return (
        <TextInput placeholder= 'Description' style={{width:300, marginTop: 10, marginLeft:10}} onChangeText={(text) => this.setState({deckdescription: text})}></TextInput>
      );
    }
    else {
      return (
        <TextInput placeholder= 'Description' style={{width:300, marginTop: 10, marginLeft:10}} onChangeText={(text) => this.setState({deckdescription: text})}>{deck.description}</TextInput>
      );
    }
  }
  _withdeckornot(deck) {
    if (deck == 'NO-DECK') {
      return (
        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
            <Image
                style={{width: 100, height: 100}}
                source={{uri: 'https://info.goconqr.com/files/2016/05/flashcard-icon.png'}}
            />
        <TextInput placeholder= 'Deck Name' style={{width: 200, marginLeft:20}} onChangeText={(text) => this.setState({deckname: text})}>
        </TextInput>
        </View>
      );
    }
    else {
      return (
        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
            <Image
                style={{width: 100, height: 100}}
                source={{uri: 'https://info.goconqr.com/files/2016/05/flashcard-icon.png'}}
            />
        <TextInput placeholder= 'Deck Name' style={{width: 200, marginLeft:20}} onChangeText={(text) => this.setState({deckname: text})}>{deck.name}
        </TextInput>
        </View>
      );
    }
  }
 /**
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

  _Createnewdeck(theds, name2) {
    console.log('ciao');
    console.log(theds.decks);
    name = this.state.deckname;
    description = this.state.deckdescription;
    if (theds != 'boh') {
    theds.createDeck(name, description, []);
    console.log(theds);
    index = theds.decks.length-1;
    console.log(index);
    theds.storeDeck(index, (ondecksload) => {
       console.log(theds);
       this.props.navigation.push('DeckScreen');
       Toast.show({
        text: 'the deck ' + name + ' has been created.',
        textStyle: { color: "yellow" },
        buttonText: 'Okay'
      })
      });
    }
    else {
      ds = new DeckStorage();
      ds.getStoredDecks((decks) => {
        console.log("nuovo deck");
        indexofdeck = ds.searchDeck(name2);
        ds.decks[indexofdeck].name = name;
        ds.decks[indexofdeck].description = description;
        ds.storeDeck(indexofdeck, (ondecksload) => {
          this.props.navigation.push('DeckScreen');
          Toast.show({
           text: 'the deck has been created.',
           textStyle: { color: "yellow" },
           buttonText: 'Okay'
         })
         });
        });
    }
  }

  render() {
    const { navigation } = this.props;
    const passed_deck_all = navigation.getParam('deckall', 'NO-DECK');
    const passed_name = navigation.getParam('dsfromdecks', 'boh');
    const namedeckupdate = passed_deck_all == 'NO-DECK' ? '' : passed_deck_all.name;
    const descriptionupdate = passed_deck_all == 'NO-DECK' ? '' : passed_deck_all.description;
    const title = passed_deck_all == 'NO-DECK' ? 'New Deck' : 'Update ' + passed_deck_all.name;
    if(!this.state.flag){
    this.setState({deckdescription: descriptionupdate, deckname: namedeckupdate, flag: true});
    }
    return (
      <Root>  
      <View style={styles.container}>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='checkmark' onPress = {() => this._Createnewdeck(passed_name, namedeckupdate)}/>
            </Button>
          </Right>
        </Header>
            {this._withdeckornot(passed_deck_all)}
            {this._descr(passed_deck_all)}
        <View style={{flexDirection: 'row', height: 15, marginTop:15}} backgroundColor='#C0C0C0' >
        </View>
          {this._listofcards(passed_deck_all)}
      <ActionButton onPress={() => {this.props.navigation.push('CardCreationScreen')}} buttonColor='#4169E1' bgColor='rgba(105,105,105,0.6)'>
      </ActionButton>
      </Container> 
      </View>
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

const actions = [{
  text: 'Donwload deck',
  name: 'download',
  icon: "md-notifications-off",
  position: 1,
}, {
  text: 'Create deck',
  name: 'create',
  position: 2
}];

