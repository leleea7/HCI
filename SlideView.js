import React, { Component } from 'react';
import { Image, AppRegistry, Text, View } from 'react-native';
import CardSilder from 'react-native-cards-slider';

class App extends Component{
  render(){
    return(
      <View>
        <Text style={{fontSize: 30, color: '#000', marginTop:50, marginLeft:20, fontWeight:'bold'}}>
          Un source script per prendere i Cards 
        </Text>
        <CardSilder style={{marginTop: 30}}>
          <Image style={{height: 170}} source={{url : 'image if it has one'}} />
          <Image style={{height: 170}} source={{url : 'image if it has one'}} />
          <Image style={{height: 170}} source={{url : 'image if it has one'}} />
          <Image style={{height: 170}} source={{url : 'image if it has one'}} />
        </CardSilder>
        <Text style={{fontSize: 30, color: '#000', marginTop:40, marginLeft:20, fontWeight:'bold'}}>
          Block with cards 
        </Text>
        <CardSilder style={{marginTop: 30}}>
          <View style={{height: 170, justifyContent:'center', alignItems:'center', backgroundColor: 'skyblue'}}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
            TODO here we need to put instead of text the cards object....

            </Text>
          </View>
          <View style={{height: 170, justifyContent:'center', alignItems:'center', backgroundColor: 'lightsalmon'}}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
            TODO here we need to put instead of text the cards object....

            </Text>
          </View>
          <View style={{height: 170, justifyContent:'center', alignItems:'center', backgroundColor: 'teal'}}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
            TODO here we need to put instead of text the cards object....

            </Text>
          </View>
          <View style={{height: 170, justifyContent:'center', alignItems:'center', backgroundColor: 'lightpink'}}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
              TODO here we need to put instead of text the cards object....
            </Text>
          </View>
        </CardSilder>
      </View>
    )
  }
}

AppRegistry.registerComponent('YOUR_APP_NAME', () => App);