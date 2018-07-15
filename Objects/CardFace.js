import PropTypes from 'prop-types';
import React, { Component } from 'react';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { View, Text, StyleSheet, AppRegistry, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class CardFace extends Component {
  static propTypes = {
    editable: PropTypes.bool
  }

  static defaultProps = {
    editable: true
  }

  constructor(props) {
    super(props);

    this.state = {
      cardDimensionsMeasured: false, //Used in setDimensions
      cardHeight: 0,
      cardWidth: 0,
      cardBorderRadius: 0,
      cardBorderWidth: 0,
      cardLayout: 'TitleAndImage',
      cardText: '',
      cardTitle: '',
      asd: '',
      cardImage: '',
      textHeight: 0,
      containerHeight: 0,
      layoutRender: () => {}
    }

    if(this.props.editable) {
      this.state.layoutRender = this._renderTitleAndImageLayout;
    }
  }

  setTitle = (title) => {
    this.setState({cardTitle: title});
  }

  setText = (text) => {
    this.setState({cardText: text});
  }

  setImage = (image) => {
    this.setState({cardImage: image});
  }

  empty = () => {
    this.setState({cardTitle: '', cardText: '', cardImage: ''});
  }

  setDimensions = (containerWidth, containerHeight) => {
    //Allow the computation of the dimensions only one time
    //so that successive renderings do not modify them (If not used then
    //if the keyboard is shown the card is scaled down for instance).
    if(!this.state.cardDimensionsMeasured) {
      this.setState({
        cardDimensionsMeasured: true,
        cardHeight: containerHeight * 90/100,
        cardWidth: containerWidth * 85 / 100,
        cardBorderRadius: containerWidth * 800 / 10000,
        cardBorderWidth: 1,
        containerHeight: containerHeight
      });
    }
  }

  setCardLayout = (layoutName) => {
    if(layoutName === 'TitleAndImage') {
      this.state.layoutRender = this._renderTitleAndImageLayout;
    } else if(layoutName === 'TitleOnly') {
      this.state.layoutRender = this._renderTitleOnly;
    } else if(layoutName === 'TextOnly') {
      this.state.layoutRender = this._renderTextOnly;
    } else {
      this.state.layoutRender = this._renderImageOnly;
    }

    this.setState({layoutRender: this.state.layoutRender, cardLayout: layoutName});
  }

  _onTextLayout = (evt) => {
    this.setState({
      textHeight: evt.nativeEvent.layout.height
    })
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.openPicker({
      width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
      height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
      cropping: true
    }).then(image => {
      console.log(image.path);
      let source = { uri: image.path };
      this.setState({cardImage: source});
    });

    /*ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          cardImage: source,
        });
      }
    });*/
  }

  _renderTitleAndImageLayout = () => {
    if(this.props.editable) {
      console.log(this.state.cardWidth, this.state.cardHeight);
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <TextInput
            onChangeText={(text) => this.setState({cardTitle: text})}
            value={this.state.cardTitle} onLayout = {this._onTextLayout}
            multiline = {true} autoGrow = {true} placeholder = "Title"
            style = {{
              width: this.state.cardWidth*80/100,
              minHeight: 50,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20
            }}/>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.selectPhotoTapped.bind(this)}>
              <View style={{
                height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                backgroundColor: '#90ee90',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20
              }}>
              { this.state.cardImage == '' ? <Text>Select a Photo</Text> :
                <Image style={{
                  height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                  width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                  borderRadius: 20
                }} source={this.state.cardImage} />
              }
              </View>
            </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <Text onLayout = {this._onTextLayout} style = {{
              width: this.state.cardWidth*80/100,
              minHeight: 50,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20
            }}>
            {this.state.cardTitle}
          </Text>
          <Image style={{
            height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
            width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
            borderRadius: 20
          }} source={this.state.cardImage}/>
        </View>
      );
    }
  }

  _renderTitleOnly = () => {
    if(this.props.editable) {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <TextInput
            onLayout = {this._onTextLayout}
            onChangeText={(text) => this.setState({cardTitle: text})}
            value={this.state.cardTitle}
            multiline = {true}
            autoGrow = {true}
            placeholder = "Title"
            style = {{
              width: this.state.cardWidth*80/100,
              minHeight: 50,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24
            }}/>
        </View>
      );
    } else {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <Text style = {{
            width: this.state.cardWidth*80/100,
            minHeight: 50,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20
          }}>
            {this.state.cardTitle}
          </Text>
        </View>
      );
    }
  }

  _renderTextOnly = () => {
    if(this.props.editable) {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <TextInput
            onLayout = {this._onTextLayout}
            onChangeText={(text) => this.setState({cardTitle: text})}
            value={this.state.cardTitle}
            multiline = {true}
            autoGrow = {true}
            placeholder = "Title"
            style = {{
              width: this.state.cardWidth*80/100,
              minHeight: 50,
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: 14
            }}/>
        </View>
      );
    } else {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <Text style = {{
            width: this.state.cardWidth*80/100,
            minHeight: 50,
            textAlign: 'center',
            fontWeight: 'normal',
            fontSize: 14
          }}>
            {this.state.cardTitle}
          </Text>
        </View>
      );
    }
  }

  _renderImageOnly = () => {
    if(this.props.editable) {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={this.selectPhotoTapped.bind(this)}>
            <View style={{
              height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
              width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
              backgroundColor: '#90ee90',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20
            }}>
            { this.state.cardImage == '' ? <Text>Select a Photo</Text> :
              <Image style={{
                height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
                borderRadius: 20
              }} source={this.state.cardImage} />
            }
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{
          width: this.state.cardWidth,
          height: this.state.cardHeight,
          alignItems:'center',
          justifyContent: 'space-between'
        }}>
          <Image style={{
            height: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
            width: Math.min((this.state.cardHeight-this.state.textHeight)*80/100, this.state.cardWidth*90/100),
            borderRadius: 20
          }} source={this.state.cardImage}/>
        </View>
      );
    }
  }

  render() {
    return(
      <KeyboardAwareScrollView
            style={{ backgroundColor: 'transparent' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{
              height: this.state.containerHeight,
              alignItems:'center',
            justifyContent: 'center'
          }}
            scrollEnabled={true}
      >
        <View style={{
          height: this.state.cardHeight,
          width: this.state.cardWidth,
          borderRadius: this.state.cardBorderRadius,
          borderWidth: this.state.cardBorderWidth,
          borderColor: '#7f7f7f',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F9FA'
        }}>
          {this.state.layoutRender()}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

