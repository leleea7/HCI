import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
// import Heading from "./Header";
import DeckScreen from "./components/DeckScreen";
import CreateDeck from "./components/DeckScreen/second";
import DeckSettings from "./components/DeckScreen/third";
import DeckDownload from "./components/DeckScreen/fourth";
import AppNavigator from "./navigator";
//import NewCardScreen from "./NewCardScreen";
//import ReviewScreen from "./ReviewScreen";

class App2 extends Component {
 _renderScene() {
 //return <DeckScreen />;
 return <AppNavigator/>;
 }
 render() {
     StatusBar.setBackgroundColor("#303F9F", true);
     StatusBar.setBarStyle("light-content", true);


 return (
 <View style = {{flex: 1}} >
 {this._renderScene()}
 </View>
 );
 }
}
export default App2;