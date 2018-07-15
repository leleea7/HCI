import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Root, Icon, Title, Thumbnail, Subtitle, Content, List, ListItem, Switch } from 'native-base';
//import '../DeckScreen/declare_modules.d.ts';
import {Platform, StatusBar} from 'react-native';
import { ActionSheet } from "native-base";
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";
import DeckStorage from '../../Objects/DeckStorageBackup';





var BUTTONS = [
  { text: "Delete", icon: "trash", iconColor: "#2c8ef4"}
];

export class DeckSettings extends Component {

  constructor() {
    super()
    this.state = {
      switchvalue1: false,
      switchvalue2: true,
      switchvalue3: false,
      decksi: false,
      mydecks: []
    };
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
  **/
  makeaction() {
    Alert.alert(
      'Backup decks on cloud',
      'This function allows you to ..',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    ) 
  }

  _listofcards (deck) { 
    console.log(deck)
    var front = '';
    var back = '';
    /**if (deck == 'NO-DECK') {
      return (<Text style = {{marginLeft: 5, marginTop: 150, textAlign: 'center', fontSize: 15}}> You don't have any cards yet.
      {"\n"} Tab on + to add new ones. </Text>);
    }**/
    if (!this.state.decksi){return (<View></View>);}
    if (deck.cards.length > 0) {
    return deck.cards.map((card, cardIndex) => {

        //front
        if(card.layoutFront == "TitleAndImage")
        {
          front = card.titleFront;
        }
        else if(card.layoutFront == "TitleOnly")
        {
          front = card.titleFront;
        }
        else if(card.layoutFront == "TextOnly")
        {
          front = card.titleFront;
        }
        else if(card.layoutFront == "ImageOnly")
        {
          front = 'image';
        }

        //back
        if(card.layoutBack == "TitleAndImage")
        {
          back = card.titleBack;
        }
        else if(card.layoutBack == "TitleOnly")
        {
          back = card.titleBack;
        }
        else if(card.layoutBack == "TextOnly")
        {
          back = card.titleBack;
        }
        else if(card.layoutBack == "ImageOnly")
        {
          back = 'image';
        }
        console.log(card);
        return (
      <View>
      <ListItem onLongPress = {() => this._showbottomsheet(cardIndex, deck)} style={{padding: 10}}>
      <Text style={{marginTop:3, marginLeft:5}}>
          Q: {front} {"\n"} {"\n"}
          A: {back}
      </Text>
      </ListItem>
      </View>);
        });
      }
    else {
      return (<Text style = {{marginLeft: 5, marginTop: 150, textAlign: 'center', fontSize: 15}}> You don't have any cards yet.
       {"\n"} Tab on + to add new ones. </Text>);
    }
}
  /** 
  _showbottomsheet() {
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "Possible actions"
      },
      (buttonValue) => {this.makeaction(buttonValue)}
    )
  }**/
  refreshFunction = () => {
    this.setState({decksi:false})
    this.forceUpdate();
  }
  _showbottomsheet(cardIndex, deck) {
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "Possible actions"
      },
      (buttonValue) => {this.removeCard(cardIndex, deck, buttonValue);}
    )
  }
  removeCard(cardIndex, deck, buttonValue) {
    console.log(buttonValue);
    if(buttonValue == 0){
    ds.decks[this.myIndex].cards.splice(cardIndex, 1);
    console.log("my decks ", ds.decks);
    console.log("my index = ", this.myIndex);
    ds.storeDeck(this.myIndex, () => {
      console.log('puo esse?');
      this.forceUpdate();
    });
  }
  }

  render() {
    console.log('decksi: ', this.state.decksi);
    const { navigation } = this.props;
    const passed_name = navigation.getParam('deckname', 'NO-ID');
    this.ds = new DeckStorage();
    ds.getStoredDecks((decks) => {
      console.log(ds.decks);
      this.myIndex = ds.searchDeck(passed_name);
      this.myDeck = ds.decks[this.myIndex];
      console.log("deck del cazzo", this.myDeck);
      this.cards = this.myDeck.cards.length;
      if(!this.state.decksi) {
        this.setState({decksi:true});
      }
    });
    const passed_deck_all = navigation.getParam('deckall', 'NO-DECK');
    const passed_description = navigation.getParam('deckdescr', '');
    const deckIndex = navigation.getParam('deckindex', 0);
    //const booleano = navigation.getParam('deckcarta', false);
    //const deckvero = booleano ? 
    return (
      <Root>  
      <View style={styles.container}>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.push('DeckScreen')}}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>{passed_name}</Title>
            <Subtitle style={{fontSize: 12}}>{this.cards} cards</Subtitle>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='create' onPress={() => {this.props.navigation.push('CreateDeck', {deckname: passed_name, deckdescr: passed_description, deckall:this.myDeck})}}/>
            </Button>
            <Button transparent>
              <Icon name='search'/>
            </Button>
            <Button transparent>
              <Icon name='more'/>
            </Button>
          </Right>
        </Header>
          <List>
            <ListItem>
              <Body>
                <Text>Study both sides of the card</Text>
              </Body>
              <Right>
                <Switch onValueChange={() => this.setState({ switchvalue1: !this.state.switchvalue1 })}
                        value={this.state.switchvalue1} onTintColor='#ff75ac' thumbTintColor='#ed1556'/>
              </Right>
            </ListItem>
            <ListItem icon>
              <Body>
                <Text>Backup decks on cloud</Text>
              </Body>
              <Right>
              <Icon name="information-circle" style={{color:'#ff75ac', fontSize:25, marginRight: 5}} onPress={() => this.makeaction()}/>
                <Switch onValueChange={() => this.setState({ switchvalue2: !this.state.switchvalue2 })}
                        value={this.state.switchvalue2} onTintColor='#ff75ac' thumbTintColor='#ed1556'/>
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Public</Text>
              </Body>
              <Right>
                <Switch onValueChange={() => this.setState({ switchvalue3: !this.state.switchvalue3 })}
                        value={this.state.switchvalue3} onTintColor='#ff75ac' thumbTintColor='#ed1556'/>
              </Right>
            </ListItem>
          </List>
        <View style={{flexDirection: 'row', height: 15, marginTop:0}} backgroundColor='#C0C0C0' >
        </View>
        <ScrollView>
        {this._listofcards(this.myDeck)}
        </ScrollView>
        <ActionButton onPress={() => {this.props.navigation.push('CardCreationScreen', {index: deckIndex, refresh: this.refreshFunction})}} buttonColor='#4169E1' bgColor='rgba(105,105,105,0.6)'>
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

