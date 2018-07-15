import React, {Component}  from 'react';
import {
  View,
  StyleSheet,
  Animated,
  AppRegistry,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import PropTypes from 'prop-types'

export default class FlippableCard extends Component {
  static propTypes = {
    onFrontToBack: PropTypes.func,
    onBackToFront: PropTypes.func
  };

  static defaultProps = {
    onFrontToBack: () => {},
    onBackToFront: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      //Rotation value modified by the animation
      rotation: new Animated.Value(0),
      //The current face of the card that is shown. Can be 'front' or 'back'
      faceShown: 'front'
    }
  }

  getFaceShown() {
    return this.state.faceShown;
  }

  backToFrontAnimation() {
    return Animated.timing(this.state.rotation, {
      toValue: 0,
      duration: 300
    });
  }

  componentWillMount() {
    this.frontRotationInterpolate = this.state.rotation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.frontOpacityInterpolate = this.state.rotation.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backRotationInterpolate = this.state.rotation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.backOpacityInterpolate = this.state.rotation.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  flipCardAnimation() {
    if(this.state.faceShown === 'front') {
      this.props.onFrontToBack();
      Animated.spring(this.state.rotation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        easing: Easing.linear,
      }).start();
      this.state.faceShown = 'back';
    } else {
      this.props.onBackToFront();
      Animated.spring(this.state.rotation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        easing: Easing.linear
      }).start();
      this.state.faceShown = 'front';
    }
  }

  render() {
    const frontCardStyle = {
      transform: [{ rotateY: this.frontRotationInterpolate }],
      opacity: this.frontOpacityInterpolate
    }

    const backCardStyle = {
      position: 'absolute',
      top: 0,
      transform: [{ rotateY: this.backRotationInterpolate }],
      opacity: this.backOpacityInterpolate
    }

    return (
        <TouchableWithoutFeedback onPress={() => this.flipCardAnimation()}>
          <View style={this.props.style}>
            <Animated.View style={frontCardStyle}>
              {this.props.children[0]}
            </Animated.View>
            <Animated.View style={backCardStyle}>
              {this.props.children[1]}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
    )
  }
}