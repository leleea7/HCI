import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Button, Icon, Title, Right, Form, Item, Label, Input, Text } from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import firebase from './firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from './style';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
        //this.prova();
    }

    /*prova() {
        firebase.database().ref('users').once('value', snap => {
            snap.forEach(user => {
                if (user.val().decks) {
                    console.log(user.val().decks);
                }
            });
        });
    }*/

    login() {
        if (!this.state.email) {
            Alert.alert('Error', 'Please enter the e-mail address');
            return;
        }
        if (!this.state.password) {
            Alert.alert('Error', 'Please enter the password');
            return;
        }
        this.setState({loading: true});
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(res => {
            //console.log(res.message);
            this.setState({loading: false});
            Alert.alert('Error', res.message);
        }).then(res => {
            //console.log(res);
            if (res) {
                var username;
                var uid;
                //firebase.database().ref('users').once('value', snap => {
                firebase.database().ref('users').orderByChild('uid').equalTo(res.user.uid).once('value', snap => {
                    //console.log(snap.val());
                    snap.forEach(user => {
                        //console.log(user.val());
                        if (res.user.uid == user.val().uid) {
                            this.setState({loading: false});
                            username = user.val().username;
                            uid = user.val().uid
                            //Alert.alert('UID', user.val().username + user.val().uid);
                            this.props.navigation.navigate('DeckScreen');
                            return true;
                        }
                        
                    });
                }).catch(res => {
                    //console.log(res.message);
                    this.setState({loading: false});
                    Alert.alert('Error', res.message);
                }).then(() => {
                    AsyncStorage.setItem('username', username);
                    AsyncStorage.setItem('uid', uid);
                });  
            }
        });
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor={colors.darkPrimaryColor} style={{backgroundColor: colors.defaultPrimaryColor}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{flex: 1, justifyContent: 'center', width: '80%', marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input autoCapitalize="none" keyboardType="email-address" onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Button rounded style={{alignSelf: 'center', width: '70%', maxWidth: 500, justifyContent:'center', marginTop: '3%'}} onPress={() => this.login()} >
                            <Text style={{width: '100%', textAlign: 'center'}}>Login</Text>
                        </Button>
                    </Form>
                    <ProgressDialog
                        visible={this.state.loading}
                        title="Login"
                        message="Please wait..."
                        activityIndicatorSize="large"
                        activityIndicatorColor="#303F9F"
                    />
                </Content>
            </Container>
        );
    }
}