import{
    View,
    Dimensions,
    Animated,
    PanResponder,
    AppRegistry,
    Text,
    Image
  } from 'react-native';
  import DeckStorage from './DeckStorage.js'
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import { Button, Container, Header, Footer, Content, FooterTab, Left, Body, Right, Icon, Title } from 'native-base';
  import FlippableCard from './FlippableCard.js'
  import CardFace from './CardFace.js'
  
  /*export default class CardViewer extends Component {
    static propTypes = {
      cardWidth: PropTypes.number.isRequired,
      blockedDragRange: PropTypes.number.isRequired,
      reinsertAnimationOut: PropTypes.number.isRequired,
      reinsertCardAnimDuration: PropTypes.number.isRequired,
      removeCardAnimOut: PropTypes.number.isRequired,
      removeCardAnimDuration: PropTypes.number.isRequired,
      onOutStart: PropTypes.func,
      onOutMiddle: PropTypes.func,
      onOutEnd: PropTypes.func
    }
  
    static defaultProps = {
      onOutStart: () => {},
      onOutMiddle: () => {return null;},
      onOutEnd: () => {}
    }
  
    cardViews = [];
    swipeAnimationValues = [];
    cardStack = [];
    cardState = 'blocked';
  
    constructor(props) {
      super(props);
  
      this.cardViews = (this.props.children.length > 1)?
              this.props.children:
              [this.props.children];
  
      for(let i = 0; i < this.cardViews.length; ++i) {
        this.swipeAnimationValues.push(new Animated.Value(0));
        this.cardStack.push(i);
      }
    }
  
    setBlocked() {
      this.cardState = 'blocked';
    }
  
    setCorrect() {
      this.cardState = 'correct';
    }
  
    setWrong() {
      this.cardState = 'wrong';
    }
  
    componentWillMount() {
      putBack = () => {
        let removedCard = this.cardStack.splice(this.cardStack.length-1, 1)[0];
        this.cardStack.unshift(removedCard);
        this.forceUpdate();
  
        let anim = this.props.onOutMiddle();
        let animations = [];
        if(anim != null) {
          animations.push(anim);
        }
  
        animations.push(
          Animated.timing(this.swipeAnimationValues[this.cardStack[0]], {
            toValue: 0,
            duration: this.props.reinsertCardAnimDuration
          })
        );
        Animated.sequence(animations).start(this.props.onOutEnd());
      }
  
      removeCard = () => {
        this.props.onOutEnd();
        this.cardStack.splice(this.cardStack.length-1, 1);
        this.forceUpdate();
      }
  
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) >= 40;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) >= 40;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderGrant: (evt, gestureState) => {},
        onPanResponderMove: (evt, gestureState) => {
          if(this.cardState === 'blocked') {
            console.log("ASDONE", this.props.blockedDragRange);
            if(Math.abs(gestureState.dx) > this.props.blockedDragRange) {
              this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]].setValue(Math.sign(gestureState.dx) * this.props.blockedDragRange);
            } else {
              this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]].setValue(gestureState.dx);
            }
          } else {
            this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]].setValue(gestureState.dx);
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          if(this.cardState != 'blocked') {
            if(this.cardState === 'wrong') {
              this.props.onOutStart();
              if(Math.abs(gestureState.dx) < this.props.reinsertAnimationOut) {
                Animated.timing(this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]], {
                  toValue: Math.sign(gestureState.dx)*this.props.reinsertAnimationOut,
                  duration: this.props.reinsertCardAnimDuration - Math.abs(gestureState.dx)
                }).start(putBack);
              } else {
                putBack();
              }
            } else {
              this.props.onOutStart();
              Animated.timing(this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]], {
                toValue: Math.sign(gestureState.dx)*this.props.removeCardAnimOut,
                duration: this.props.removeCardAnimDuration
              }).start(removeCard());
            }
          } else {
            Animated.timing(this.swipeAnimationValues[this.cardStack[this.cardStack.length-1]], {
              toValue: 0,
              duration: 100
            }).start();
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {},
        onShouldBlockNativeResponder: (evt, gestureState) => true
      })
    }
  
    render() {
      return (
        <View style={this.props.style}>
          {
            this.cardStack.map((item, index) => {
              if (index == 0) {
                return(
                  <Animated.View {...this._panResponder.panHandlers} key={item} style={{
                          left: this.swipeAnimationValues[item]
                        }}>
                      {this.cardViews[item]}
                  </Animated.View>
                );
              } else {
                return(
                  <Animated.View {...this._panResponder.panHandlers} key={item} style={{
                          position: 'absolute',
                          top: 0,
                          left: this.swipeAnimationValues[item]
                        }}>
                      {this.cardViews[item]}
                  </Animated.View>
                );
              }
            })
          }
        </View>
      );
    }
  }*/
  console.disableYellowBox = true;
  export class CardViewer extends Component {
    constructor(props) {
      super(props);
        
      this.state = {
        cardViews: [],
        cardFaceRefs: [],
        contentLayoutHeight: 0,
        contentLayoutWidth: 0,
        cardStack: [],
        swipeAnimationValues: [],
        cardBlocked: true,
        realContentLayoutHeight: 0,
        flippableCardRefs: [],
        tapTextOpacity: 1,
        answerButtonsLeft: 0,
        rightWrongDirectionsOpacity: 0
      }
      
      const { navigation } = this.props;
      this.deckIndex = navigation.getParam('index', 0);

      this.ds = new DeckStorage();
      this.ds.getStoredDecks((decks) => {
        console.log(decks);
        for(let i = 0; i < decks[this.deckIndex].getCardsToStudy().length; i++) {
          this.state.cardStack.push(i);
          this.state.swipeAnimationValues.push(new Animated.Value(0));
          this.state.cardViews.push(
            <View key={i} style={{position:'absolute', top:0, width: Dimensions.get("window").width}}>
            <FlippableCard
              ref = {fc => {
                if(fc!=null) {
                  this.state.flippableCardRefs.push(fc);
                }
              }}
              onFrontToBack = {() => {
                this.setState({cardBlocked: false, tapTextOpacity: 0, rightWrongDirectionsOpacity: 1, answerButtonsLeft: 0});
              }}
              style={{width: Dimensions.get("window").width, alignItems:'center', justifyContent:'center'}}>
              <CardFace
                editable={false}
                ref={
                  cF => {
                    if(cF == null) return;
                    this.state.cardFaceRefs.push(cF);
                    cF.setCardLayout(decks[this.deckIndex].getCardsToStudy()[i][0].layoutFront);
                    cF.setTitle(decks[this.deckIndex].getCardsToStudy()[i][0].titleFront);
                    cF.setText(decks[this.deckIndex].getCardsToStudy()[i][0].textFront);
                    cF.setImage(decks[this.deckIndex].getCardsToStudy()[i][0].imageFront);
                  }
                }/>
              <CardFace
                editable={false}
                ref={
                  cB => {
                    if(cB == null) return;
                    this.state.cardFaceRefs.push(cB);
                    cB.setCardLayout(decks[this.deckIndex].getCardsToStudy()[i][0].layoutBack);
                    cB.setTitle(decks[this.deckIndex].getCardsToStudy()[i][0].titleBack);
                    cB.setText(decks[this.deckIndex].getCardsToStudy()[i][0].textBack);
                    cB.setImage(decks[this.deckIndex].getCardsToStudy()[i][0].imageBack);
                  }
                }/>
            </FlippableCard>
            </View>
          );
        }
        this.setState({answerButtonsLeft:Dimensions.get("window").width, cardViews: this.state.cardViews, cardFaceRefs: this.state.cardFaceRefs, cardStack: this.state.cardStack});
      })
    }
  
    cardAnimationOut = () => {
      Animated.timing(this.state.swipeAnimationValues[
        this.state.cardStack[this.state.cardStack.length-1]
      ], {
        toValue: -this.state.contentLayoutWidth,
        duration: 200
      }).start(this.removeCard);
    }
  
    removeCard = () => {
      removedCardIndex = this.state.cardStack.splice(this.state.cardStack.length-1, 1);
      deck = this.ds.decks[this.deckIndex]
      deck.cards[deck.getCardsToStudy()[removedCardIndex][1]].dateToStudy = Date.now() + 20000;
      this.ds.storeDeck(this.deckIndex, () => {console.log("DateToStudy aggiornata")});
      this.setState({cardBlocked: true, cardStack: this.state.cardStack, tapTextOpacity: 1, rightWrongDirectionsOpacity: 0, answerButtonsLeft: Dimensions.get("window").width })
    }
  
    reinsertCard = () => {
      removedCard = this.state.cardStack.splice(this.state.cardStack.length-1, 1);
      this.state.cardStack.unshift(removedCard);
      this.setState({cardStack: this.state.cardStack, tapTextOpacity: 1, rightWrongDirectionsOpacity: 0, answerButtonsLeft: Dimensions.get("window").width })
    }
  
    cardReinsertAnimation = (x) => {
      if(x >= -this.state.cardFaceRefs[0].state.cardWidth) {
          Animated.timing(this.state.swipeAnimationValues[this.state.cardStack[this.state.cardStack.length - 1]], {
            toValue: this.state.cardFaceRefs[0].state.cardWidth,
            duration: 100
          }).start(() => {
            this.reinsertCard();
            this.setState({cardBlocked: true});
            if(this.state.flippableCardRefs[this.state.cardStack[0]].state.faceShown==='back') {
              this.state.flippableCardRefs[this.state.cardStack[0]].flipCardAnimation();
            }
            Animated.timing(this.state.swipeAnimationValues[this.state.cardStack[0]], {
              toValue: 0,
              duration: 100
            }).start();
          })
      } else {
        Animated.timing(this.state.swipeAnimationValues[this.state.cardStack[this.state.cardStack.length - 1]], {
          toValue: 0,
          duration: 100
        }).start();
      }
    }
  
    putBack = () => {
      removedCard = this.state.cardStack.splice(this.state.cardStack.length-1, 1);
      this.state.cardStack.unshift(removedCard);
      this.setState({cardStack: this.state.cardStack})
    }
  
    componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) >= 20;
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return Math.abs(gestureState.dx) >= 20;
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderGrant: (evt, gestureState) => {},
        onPanResponderMove: (evt, gestureState) => {
          if(this.state.cardBlocked && Math.abs(gestureState.dx) > 60) {
            return;
          }
  
          this.state.swipeAnimationValues[
            this.state.cardStack[this.state.cardStack.length-1]
          ].setValue(gestureState.dx);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          if(this.state.cardBlocked || Math.abs(gestureState.dx) <= 60) {
            Animated.timing(this.state.swipeAnimationValues[this.state.cardStack[this.state.cardStack.length - 1]], {
              toValue: 0,
              duration: 100
            }).start();
          } else {
            if(Math.sign(gestureState.dx) > 0) {
              this.cardReinsertAnimation(gestureState.dx);
            } else {
              this.cardAnimationOut();
            }
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {},
        onShouldBlockNativeResponder: (evt, gestureState) => true
      })
    }
  
    _onContentLayout = (evt) => {
      this.setState({contentLayoutHeight: evt.nativeEvent.layout.height*80/100,
                     contentLayoutWidth: evt.nativeEvent.layout.width,
                     realContentLayoutHeight: evt.nativeEvent.layout.height});
  
      for(let i = 0; i < this.state.cardFaceRefs.length; i++) {
        this.state.cardFaceRefs[i].setDimensions(evt.nativeEvent.layout.width, evt.nativeEvent.layout.height*85/100);
      }
    }
  
    render() {
      return(
        <Container>
          <Header style={{backgroundColor: '#0097a7'}}>
            <Left>
            <Button transparent onPress={() => {this.props.navigation.push('DeckScreen')}}>
              <Icon name='arrow-round-back' />
            </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Add New Card</Title>
            </Body>
            <Right/>
          </Header>
          <Content onLayout = {this._onContentLayout}>
            <View style={{height: this.state.contentLayoutHeight, width:Dimensions.get("window").width}}>
              {
                this.state.cardStack.map((item, index) => {
                  return(
                    <Animated.View key={item} {...this._panResponder.panHandlers} style={{
                            left: this.state.swipeAnimationValues[item]
                          }}>
                      {this.state.cardViews[item]}
                    </Animated.View>
                  );
                })
              }
              {console.log("Mannaggia a cristo")}
            </View>
            <View style={{ height: this.state.realContentLayoutHeight*20/100, alignItems:'center', justifyContent:'center'}}>
              <View style={{opacity: this.state.tapTextOpacity}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>Fai tap sulla carta per vedere la risposta!</Text>
              </View>
              <View style={{position: 'absolute', top:0, left: this.state.answerButtonsLeft, alignItems:'center', height: this.state.realContentLayoutHeight*20/100, width:Dimensions.get("window").width, opacity: this.state.rightWrongDirectionsOpacity, flexDirection:'row', justifyContent: 'space-evenly'}}>
                <View style={{alignItems:'center',height: 48}}>
                  <Button transparent onPress={() =>{this.cardAnimationOut(); console.log("Porca madonna")}}>
                    <Image source={require('./swipe_left.png')}/>
                  </Button>
                  <Text style={{color: '#008000' }}>Ho indovinato!</Text>
                </View>
                <View style={{alignItems:'center',height: 48}}>
                  <Button transparent onPress={() =>{this.cardReinsertAnimation(0); console.log("Porca madonna")}}>
                    <Image source={require('./swipe_right.png')}/>
                  </Button>
                  <Text style={{color: 'rgb(200, 15, 15)' }}>Ho sbagliato!</Text>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
  