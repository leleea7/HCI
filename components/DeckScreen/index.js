import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {Toast, Container, Header, Left, Body, Right, Button, Root, Icon, Title, Thumbnail, Subtitle, Content, List, ListItem, Switch } from 'native-base';
import {Platform, StatusBar} from 'react-native';
import { ActionSheet } from "native-base";
import ActionButton from 'react-native-action-button';
import Dialog from "react-native-dialog";
import CreateDeck from "./second";
import BasicCard from "../../Objects/BasicCard";
import DeckStorage from "../../Objects/DeckStorage";
import DownloadDeckList from "./DownloadDeckList";
import { PermissionsAndroid } from 'react-native';






var BUTTONS = [
  { text: "Delete", icon: "trash", iconColor: "#2c8ef4"},
  { text: "Copy", icon: "copy", iconColor: "#2c8ef4" },
  { text: "Edit", icon: "md-create", iconColor: "#2c8ef4"}
];



export class DeckScreen extends React.Component {
  constructor(props) {
    super(props);
    ds = new DeckStorage();
    this.state = {
      loading: 'true',
      error: '',
      decks: [],
      active: 'false',
      dialogVisible: false,
      selectedDeck: '',
      decktocopy: ''
     }
     ds.getStoredDecks((decks) => {
      console.log("Current decks: ");
      for(let i = 0; i < ds.decks.length; ++i) 
        {
          console.log(ds.decks[i].name);
        }
       this.setState({decks: ds.decks, loading: 'false'});
       console.log(this.state.decks);
      });
    //Get all the stored decks
    /** 
    ds.getStoredDecks((decks) => {
      //When all the decks have been retrieved
      //Create and store a new deck
      console.log("Current decks: ");
      for(let i = 0; i < ds.decks.length; ++i) {
        console.log(ds.decks[i].name);
      }
      this._createAndStoreFirstDeck(ds, () => {
        //When the deck has been created and saved to disk
        console.log("Current decks: ");
        for(let i = 0; i < ds.decks.length; ++i) {
          console.log(ds.decks[i].name);
        }
        //Create and store a new deck
        this._createAndStoreSecondDeck(ds, () => {
          console.log("Current decks: ");
          for(let i = 0; i < ds.decks.length; ++i) {
            console.log(ds.decks[i].name);
          }
          ds.deleteDeck(0, () => {
            //When the deck has been deleted
            //Print the updated list of decks
            console.log("Current decks: ");
            for(let i = 0; i < ds.decks.length; ++i) {
              console.log(ds.decks[i].name);
            }
            //Print the first card of the first deck
            console.log(ds.decks[0].cards[0]);

            //Copy the first deck
            ds.copyDeck(0, "Geography2", () => {
              //When the deck has been copied
              //Print the updated list of decks
              console.log("Current decks: ");
              for(let i = 0; i < ds.decks.length; ++i) {
                console.log(ds.decks[i].name);
                console.log(ds.decks[i].id);
              }
              this.setState({decks: ds.decks});
            });
          });
        });
      });
    });**/

    this.requestReadPermission();
    this.requestWritePermission();
  }  

  

async requestWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

async requestReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
  /** 
  _createAndStoreFirstDeck(ds, onCreated) {
    newDeckIdx =
      ds.createDeck("Geography", "Lol", ["School", "Geography", "Capitals"]);

    if(newDeckIdx != -1) {
      ds.addCard(newDeckIdx, "What is the capital of Italy?", "", "Rome");
      ds.addCard(newDeckIdx, "What countries does the Everest Mountain occupy?", "China and Nepal");
      ds.storeDeck(newDeckIdx, () => {
        onCreated();
      });
    } else {
      onCreated();
    }
  }

  _createAndStoreSecondDeck(ds, onCreated) {
    newDeckIdx2 =
      ds.createDeck("History", "Lel", ["University", "Dates", "History", "Great events"]);

    if(newDeckIdx2 != -1) {
      ds.addCard(newDeckIdx2, "What is the date of the destruction of the Berlin wall?", "", "13 June 1990");
      ds.addCard(newDeckIdx2, "What is the date of the foundation of the Italian Republic?", "02 June 1946");
      ds.storeDeck(newDeckIdx2, () => {
        onCreated();
      })
    } else {
      onCreated();
    }
  }**/

  render() {
    console.log("deckssss");
    console.log(this.state.decks.length);
    console.log('render starting');
    sumofcards = 0;
    for(let i = 0; i<this.state.decks.length; i++) {
      sumofcards += this.state.decks[i].cards.length;
    }
    return (
    <Root>  
    <View style={styles.container}>
      <Dialog.Container visible = {this.state.dialogVisible}>
        <Dialog.Title>Duplicating deck</Dialog.Title>
        <Dialog.Description style = {{fontSizwe: 8, color: 'red'}}>{this.state.error}</Dialog.Description>
        <Dialog.Input onChangeText = {(text) => {this._onchangedeck(text)}}>
        {this.state.selectedDeck}
        </Dialog.Input>
        <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
        <Dialog.Button label="OK" onPress={() => {this._duplicatedeck(this.state.selectedDeck, this.state.decktocopy)}}/>
      </Dialog.Container>
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Your Decks</Title>
          <Subtitle style={{fontSize: 11}}>{sumofcards} total cards</Subtitle>
        </Body>
        <Right/>
      </Header>
      <Content>
        <List>
          {this._getdecklist(this.state.decks)}
        </List>
      </Content>
    <ActionButton buttonColor='#3498db' bgColor='rgba(105,105,105,0.6)'>
        <ActionButton.Item size={45} title="Donwload deck" buttonColor='#3498db' onPress={() => {this.props.navigation.push('DownloadDeckList')}}>
          <Icon name="download" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item size={45} buttonColor='#3498db' title="Create deck" onPress={() => {this.props.navigation.push('CreateDeck', {dsfromdecks: ds})}}>
          <Icon name="add" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </Container> 
    </View>
    </Root>
    );
  }

  _getdecklist(decks){
    if(this.state.loading == 'false') {
    if (this.state.decks.length > 0) {
    return this.state.decks.map((deck, i) => {
        cardstorepeat = deck.getCardsToStudy().length;
        return (
        <ListItem onPress={() => {this.props.navigation.push('CardViewer', {index: i})}} onLongPress = {() => this._showbottomsheet(i)}>
            <Thumbnail style={{width: 43, height: 43}} source={{ uri: 'https://info.goconqr.com/files/2016/05/flashcard-icon.png' }} />
            <Body  marginLeft= {10}>
                <Text style={{fontWeight: 'bold'}}>{deck.name}</Text>
            </Body>
            <Right>
                <Text note>Cards: {cardstorepeat}</Text>
            </Right>
        </ListItem>);
        });
      }
    else {
      return (<Text style = {{marginLeft: 10, marginTop: 200, textAlign: 'center', fontSize: 18}}> You don't have any deck yet.
       {"\n"} Press + to create {"\n"} a new one or to download {"\n"} one from the shared {"\n"} collection. </Text>);  
    }
  }
  else {
    return (
      <View style={styles.viewinitial}>
        <ActivityIndicator size= {75} color="#0000ff" />
      </View>
    );
  }
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

  makeaction(value, deckName, deckIndex, deckdescription, thisdeck) {
    console.log(thisdeck);
    if (value == 1) {
      console.log("value 0!");
      this.setState({selectedDeck: deckName + "_1", decktocopy: thisdeck});
      this.deckwithsamename(deckName + "_1");
      this.showDialog();
    }
    else if (value == 2) {
      this.props.navigation.push('DeckSettings', {deckname: deckName, deckdescr: deckdescription, deckall: thisdeck, deckindex: deckIndex});
    }
    else if (value == 0){
      this._deletedeckaction(deckName, deckIndex);
    }
  }
  _showbottomsheet(value) {
    console.log(this.state.decks[value].name);
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "Possible actions"
      },
      (buttonValue) => {this.makeaction(buttonValue, this.state.decks[value].name, value, this.state.decks[value].description, this.state.decks[value])}
    )
  }
  _deletedeck(deckName, deckIndex) {
    ds.deleteDeck(deckIndex, (OnDeleted) => {
      this.forceUpdate();
      Toast.show({
      text: deckName + ' has been deleted.',
      textStyle: { color: "yellow" },
      buttonText: 'Okay'
    })
  });
  }

  _deletedeckaction(deckName, deckIndex) {
    Alert.alert(
      'Deleting deck',
      'Are you sure you want to delete the deck \"' +  deckName + '\"?',
      [
        {text: 'CANCEL', color: '#FFFFFF', onPress: () => {}},
        {text: 'DELETE', onPress: () => this._deletedeck(deckName, deckIndex)}
      ],
      { cancelable: false }
    ) 
  }

  _onchangedeck(text) {
    this.deckwithsamename(text);
    this.setState({selectedDeck: text});
  }

  _duplicatedeck(newdeckname, newdeckinfo) {
    console.log('adwada')
    console.log(this.state.error);
    if(this.state.error == ''){
    this.handleCancel();
    console.log("duplicating deck");
    console.log(this.state.decks);
    console.log(this.state.selectedDeck);
    console.log(this.state.decktocopy);
    newDeck = newdeckinfo.copy();
    newDeck.name = newdeckname;
    newDeck.path="";
    this.state.decks.push(newDeck);
    ds1 = new DeckStorage();
    ds1.decks.push(newDeck);
    ds1.storeDeck(0, (ondecksload) => {
      console.log(ds1.decks)
      console.log(newDeck.name)
      console.log("storage effettuato")
    });
  }
  }

  deckwithsamename(text) {
    valued = false;
    for(let i = 0; i < this.state.decks.length; ++i) 
    {
      if(this.state.decks[i].name == text) {
        valued = true;
      }
    }
    error1 = valued == false ? '' : 'The name is already used.';
    this.setState({error: error1});
    console.log(this.state.error);
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
  viewinitial:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },
  actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})

export default DeckScreen;
