import BasicCard from "./BasicCard"


class DeckStorage {
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
      RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/Flashcards/", "utf8")
        .then((result) => {
          this.decks = [];
          this._loadDecks(result, 0, onDecksLoaded);
        })
        .catch((err) => {
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
  
    addCard(deckIndex, question, image, answer) {
      ds.decks[deckIndex].cards.push(
        new BasicCard(question, image, answer)
      );
    }
  }

export default DeckStorage;