import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import ImagePicker from 'react-native-image-crop-picker';
import DeckStorage from './DeckStorage.js'
import { Button, Container, Header, Footer, Content, FooterTab, Left, Body, Right, Icon, Title } from 'native-base';
import CardFace from './CardFace.js'
import { PermissionsAndroid } from 'react-native';

console.disableYellowBox = true;

export class CardCreationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      firstOpacity: 1,
      secondOpacity: 0,
      contentLayoutHeight: 0,
      selectedLayoutFront: 0,
      selectedLayoutBack: 0,
      currentSelectedLayout: 0,
      selectionArea: ['#99fffd', 'transparent', 'transparent', 'transparent'],
      layoutNames: ['TitleAndImage', 'TitleOnly', 'ImageOnly', 'TextOnly'],
      footerHeight: 0,
      faceBackLeft: 0,
      textInputIconLeft: 0,
      textInputFlag: false
    }

    const { navigation } = this.props;
    this.deckindex = navigation.getParam('index', 33);
    console.log('Indice: ', this.deckindex)
     
    this.state.textInputIconLeft = -Dimensions.get("window").width;
    this.state.faceBackLeft = Dimensions.get("window").width;

    this.ds = new DeckStorage();
    this.ds.getStoredDecks((decks) => {
      console.log(decks);
    })
  }

  setTab = (st) =>  {
    if(st == 0) {
        current = this.state.currentSelectedLayout;
        this.state.selectionArea[this.state.currentSelectedLayout] = 'transparent';
        this.state.selectionArea[this.state.selectedLayoutFront] = '#99fffd';
        this.setState({ textInputIconLeft: -this.windowWidth, selectedTab: st, firstOpacity:1, secondOpacity: 0, selectedLayoutBack: current, currentSelectedLayout: this.state.selectedLayoutFront, selectionArea: this.state.selectionArea, faceBackLeft: Dimensions.get("window").width });
    } else {
      console.log(this.state.currentSelectedLayout, this.state.selectedLayoutBack);
      current = this.state.currentSelectedLayout;
      this.state.selectionArea[this.state.currentSelectedLayout] = 'transparent';
      this.state.selectionArea[this.state.selectedLayoutBack] = '#99fffd';
      this.setState({ textInputIconLeft: 0,  selectedTab: st, firstOpacity:0, secondOpacity: 1, selectedLayoutFront: current, currentSelectedLayout: this.state.selectedLayoutBack, selectionArea: this.state.selectionArea, faceBackLeft: 0 });
    }
  };

  selectLayout = (index) => {
    if(this.state.selectedTab == 0) {
      this.faceFront.setCardLayout(this.state.layoutNames[index]);
    } else {
      this.faceBack.setCardLayout(this.state.layoutNames[index]);
    }
    this.state.selectionArea[this.state.currentSelectedLayout] = 'transparent';
    this.state.selectionArea[index] = '#99fffd';
    this.setState({cardType: index, renderLayout: this.state.renderLayout, currentSelectedLayout: index, selectionArea: this.state.selectionArea});
  }

  saveCard = () => {
    this.ds.addCard(this.deckindex, false, this.faceFront.state.cardLayout, this.faceFront.state.cardTitle, this.faceFront.state.cardText,
        this.faceFront.state.cardImage, this.faceBack.state.cardLayout, this.faceBack.state.cardTitle, this.faceBack.state.cardText,
        this.faceBack.state.cardImage);

    this.ds.storeDeck(this.deckindex, () => {
      this.faceFront.empty();
      this.faceBack.empty();
      ToastAndroid.show('Card Added!', ToastAndroid.SHORT);
    });
  }

  _onContentLayout = (evt) => {
    this.windowWidth = Dimensions.get("window").width;
    this.windowHeight = Dimensions.get("window").height;
    this.setState({contentLayoutHeight: evt.nativeEvent.layout.height})
    this.faceFront.setDimensions(evt.nativeEvent.layout.width, evt.nativeEvent.layout.height);
    this.faceBack.setDimensions(evt.nativeEvent.layout.width, evt.nativeEvent.layout.height);
  }

  _onFooterLayout = (evt) => {
    this.setState({footerHeight: evt.nativeEvent.layout.height});
  }

  render() {
    return(
      <Container>
        <Header style={{backgroundColor: '#0097a7'}}>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.state.params.refresh(); this.props.navigation.goBack()}}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Add New Card</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.saveCard()}>
              <Icon style={{color: 'white'}} type='MaterialIcons' name='check' />
            </TouchableOpacity>
          </Right>
        </Header>
        <MaterialTabs
          items={['FRONT', 'BACK']}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          barColor="#1fbcd2"
          indicatorColor="#fffe94"
          activeTextColor="white"
          onLayout = {this._onTabBarLayout}
        />
        <Content
          onLayout = {this._onContentLayout}>
          <View style={{
            opacity: this.state.firstOpacity,
            height: this.state.contentLayoutHeight,
            alignItems:'center',
            justifyContent: 'center'}}>
            <CardFace key={1} ref={card => {
              if(card!=null) {
                this.faceFront = card;
              }
            }}/>
          </View>
          <View style={{
            position: 'absolute',
            width: this.windowWidth,
            left: this.state.faceBackLeft,
            opacity: this.state.secondOpacity,
            height: this.state.contentLayoutHeight,
            alignItems:'center',
            justifyContent: 'center'}}>
            <CardFace key={2} ref={card => {
              if(card!=null) {
                this.faceBack = card;
              }
            }}/>
          </View>
        </Content>
        <Footer>
          <FooterTab
            onLayout = {this._onFooterLayout}
            style={{
              backgroundColor: '#e6ffff',
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <TouchableWithoutFeedback onPress = {() => this.selectLayout(0)}>
              <View style={{
                height:this.state.footerHeight,
                width: this.state.footerHeight,
                backgroundColor: this.state.selectionArea[0],
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image source={require('./TitleAndImage.png')}/>
                <Text style={{fontSize: 10}}>Title+Img</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress = {() => this.selectLayout(1)}>
              <View style={{
                height:this.state.footerHeight,
                width: this.state.footerHeight,
                backgroundColor: this.state.selectionArea[1],
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image source={require('./TitleOnly.png')}/>
                <Text style={{fontSize: 10}}>Title Only</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress = {() => this.selectLayout(2)}>
              <View style={{
                height:this.state.footerHeight,
                width: this.state.footerHeight,
                backgroundColor: this.state.selectionArea[2],
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image source={require('./ImageOnly.png')}/>
                <Text style={{fontSize: 10}}>Img Only</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress = {() => this.selectLayout(3)}>
              <View style={{
                height:this.state.footerHeight,
                width: this.state.footerHeight,
                backgroundColor: this.state.selectionArea[3],
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image source={require('./TextOnly.png')}/>
                <Text style={{fontSize: 10}}>Text only</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress = {() => this.setState({textInputFlag: !this.state.textInputFlag})}>
              <View style={{
                position:'absolute',
                left: this.state.textInputIconLeft,
                height:this.state.footerHeight,
                width: this.state.footerHeight,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {
                  this.state.textInputFlag ? <Image style={{width:28, height:28}} source={require('./keyboard.png')}/>
                    : <Image style={{width:28, height:28}} source={require('./no_keyboard.png')}/>
                }
              </View>
            </TouchableWithoutFeedback>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
