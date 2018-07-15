import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Button, Icon, Title, Right, Form, Item, Label, Input, Text } from 'native-base';
import firebase from './firebase';
import { Alert } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import colors from './style';

export class SignupScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false
        };
    }

    signup() {
        if (!this.state.username) {
            Alert.alert('Error', 'Please enter the username');
            return;
        }
        if (!this.state.email) {
            Alert.alert('Error', 'Please enter the e-mail address');
            return;
        }
        if (!this.state.password) {
            Alert.alert('Error', 'Please enter the password');
            return;
        }
        this.setState({loading: true});
        var error = false;
        var ref = firebase.database().ref('users');
        ref.once('value', snap => {
            snap.forEach(user => {
                //console.log(user.val());
                if (this.state.username == user.val().username) {
                    this.setState({loading: false});
                    Alert.alert('Error', 'This username already exists');
                    error = true;
                    return true;
                }
            });
        }).catch(res => {
            //console.log(res.message);
            this.setState({loading: false});
            Alert.alert('Error', res.message);
        }).then(res => {
            if (error) return;
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(res => {
                //console.log(res.message);
                this.setState({loading: false});
                Alert.alert('Error', res.message);
            }).then(res => {
                if (res) {
                    //console.log(res.user.uid);
                    ref.push({username: this.state.username, uid: res.user.uid}).then(res => {
                        //console.log(res);
                        this.setState({loading: false});
                        Alert.alert('Signup', 'Your account has been registered');
                    });
                }
            });
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
                        <Title>Signup</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{flex: 1, justifyContent: 'center', width: '80%', marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input autoCapitalize="none" keyboardType="email-address" onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Button rounded style={{alignSelf: 'center', width: '70%', maxWidth: 500, justifyContent:'center', marginTop: '3%'}} onPress={() => this.signup()} >
                            <Text style={{width: '100%', textAlign: 'center'}}>Register</Text>
                        </Button>
                    </Form>
                    <ProgressDialog
                        visible={this.state.loading}
                        title="Signup"
                        message="Please wait..."
                        activityIndicatorSize="large"
                        activityIndicatorColor="#303F9F"
                    />
                </Content>
            </Container>
        );
    }
}