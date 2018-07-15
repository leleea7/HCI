import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BasicCard from './BasicCard.js'

export class Deck {
  _generateID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  constructor(name, description, tags) {
    this.path = "";
    this.name = name;
    this.id = this._generateID();
    this.description = description;
    this.tags = tags;
    this.cards = [];
  }

  loadFromJSON(jsonString) {
    jsonObj = JSON.parse(jsonString);
    this.path = jsonObj.path;
    this.name = jsonObj.name;
    this.id = jsonObj.id;
    this.description = jsonObj.description;
    this.tags = jsonObj.tags;
    this.cards = [];

    for(let i = 0; i < jsonObj.cards.length; ++i) {
      this.cards.push(new BasicCard(
        jsonObj.cards[i].keyboardInput,
        jsonObj.cards[i].layoutFront,
        jsonObj.cards[i].titleFront,
        jsonObj.cards[i].textFront,
        jsonObj.cards[i].imageFront,
        jsonObj.cards[i].layoutBack,
        jsonObj.cards[i].titleBack,
        jsonObj.cards[i].textBack,
        jsonObj.cards[i].imageBack,
        jsonObj.cards[i].dateToStudy,
      ));
    }
  }

  copy() {
    newDeck = new Deck();
    newDeck.path = "";
    newDeck.name = this.name;
    newDeck.id = this._generateID();
    newDeck.description = this.description;

    newDeck.tags = [];
    for(let i = 0; i < this.tags.length; i++) {
      newDeck.tags.push(this.tags[i]);
    }

    newDeck.cards = [];
    for(let i = 0; i < this.cards.length; i++) {
      newDeck.cards.push(new BasicCard(
        this.cards[i].keyboardInput,
        this.cards[i].layoutFront,
        this.cards[i].titleFront,
        this.cards[i].textFront,
        this.cards[i].imageFront,
        this.cards[i].layoutBack,
        this.cards[i].titleBack,
        this.cards[i].textBack,
        this.cards[i].imageBack,
        this.cards[i].dateToStudy
      ));
    }

    return newDeck;
  }

  getCardsToStudy() {
    cardsToStudy = []
    for(let i = 0; i < this.cards.length; i++) {
      if(this.cards[i].dateToStudy <= Date.now()) {
        cardsToStudy.push([this.cards[i], i]);
      }
    }

    return cardsToStudy;
  }
}

export default class DeckStorage {
  constructor() {
    this.decks = [];
  }

  _loadDecks(deckFilesList, index, onDecksLoaded) {
    var RNFS = require('react-native-fs');
    if(index >= deckFilesList.length) {
      onDecksLoaded(this.decks);
    } else {
      RNFS.readFile(deckFilesList[index].path, "utf8")
        .then((content) => {
          deck = new Deck();
          deck.loadFromJSON(content);
          this.decks.push(deck);
          this._loadDecks(deckFilesList, index+1, onDecksLoaded);
        });
    }
  }

  //Loads all the decks stored in the directory "FlashCards" of ther user
  //(if it doesn't exist, it is created). onDecksLoaded(decks) is a callback
  //invoked when all the decks have been read.
  getStoredDecks(onDecksLoaded) {
    var RNFS = require('react-native-fs');
    console.log(RNFS.ExternalStorageDirectoryPath);
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Flashcards/", "utf8")
      .then((result) => {
        this.decks = [];
        this._loadDecks(result, 0, onDecksLoaded);
      })
      .catch((err) => {
        console.log(err.message);
        if(err.message === "Folder does not exist") {
          RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + "/Flashcards/")
            .then(() => {
              console.log("Directory created");
              this.getStoredDecks(onDecksLoaded);
            })
            .catch((err) => {
              console.log(err.message, err.code);
            });
        }
      });
  }

  createDeck(name, description, tags) {
    for(let i = 0; i < this.decks.length; i++) {
      if(this.decks[i].name === name) {
        return -1;
      }
    }
    this.decks.push(new Deck(name, description, tags));
    return this.decks.length - 1
  }

  searchDeck(name) {
    for(let i = 0; i < this.decks.length; i++) {
      if(this.decks[i].name === name) {
        return i;
      }
    }

    return -1;
  }

  storeDeck(deckIndex, onStored) {
    var RNFS = require('react-native-fs');
    deck = this.decks[deckIndex];
    console.log("ASD " + deckIndex, deck);
    path = deck.path != "" ?
      deck.path :
      RNFS.ExternalStorageDirectoryPath + "/Flashcards/" + deck.name + '.json';
    deck.path = path;
    RNFS.writeFile(deck.path, JSON.stringify(deck), "utf8")
      .then((success) => {
        onStored();
      })
  }

  deleteDeck(deckIndex, onDeleted) {
    var RNFS = require('react-native-fs');
    deck = this.decks[deckIndex];
    RNFS.unlink(deck.path)
      .then(() => {
        this.decks.splice(deckIndex, 1);
        onDeleted();
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message);
      });
  }

  copyDeck(deckIndex, newName, onCopied) {
    var RNFS = require('react-native-fs');
    deckCopy = this.decks[deckIndex].copy();
    deckCopy.name = newName;
    deckCopy.path = "";
    this.decks.push(deckCopy);
    this.storeDeck(this.decks.length-1, () => {onCopied();})
  }

  addCard(deckIndex, keyboardInput, layoutFront, titleFront, textFront, imageFront, layoutBack, titleBack, textBack, imageBack) {
    this.decks[deckIndex].cards.push(
      new BasicCard(keyboardInput, layoutFront, titleFront, textFront, imageFront, layoutBack, titleBack, textBack, imageBack, Date.now())
    );
  }
}
