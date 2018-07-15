/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Platform, AsyncStorage } from "react-native";
// import Heading from "./Header";
import DeckScreen from "./components/DeckScreen";
import CreateDeck from "./components/DeckScreen/second";
import DeckSettings from "./components/DeckScreen/third";
import DeckDownload from "./components/DeckScreen/fourth";
import {RootNavigator} from './navigator';
import SplashScreen from 'react-native-splash-screen';
import colors from './style';
//import AppNavigator from "./navigator";
//import NewCardScreen from "./NewCardScreen";
//import ReviewScreen from "./ReviewScreen";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          signedIn: false,
          checkedLoggedIn: false
        };
      }

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillMount() {
        this.isLoggedIn().then(val => this.setState({signedIn: val, checkedLoggedIn: true}))
    }

    isLoggedIn() {
        return new Promise((resolve, reject) => {
            AsyncStorage.multiGet(['username', 'uid']).then(val => {
            const username = val[0][1];
            const uid = val[1][1];
            if (username && uid) resolve(true);
            else resolve(false);
            }).catch(err => reject(err));
        });
    };


 render() {
    StatusBar.setBackgroundColor(colors.darkPrimaryColor, true);
    StatusBar.setBarStyle("light-content", true);
    console.log(this.state.signedIn);
    const AppNavigator = RootNavigator(this.state.signedIn);
    if (this.state.checkedLoggedIn) {
      return (
        <AppNavigator />
      );
    }
    else {
      return null;
    }
 }
}
export default App;