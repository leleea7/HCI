import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import colors from './style';

export class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1, justifyContent: 'center', width: '80%', maxWidth: 800, marginTop: 0, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Image source={require('./assets/logo.png')} style={{ alignSelf: 'center', width: '90%', maxWidth: 600}} resizeMode="contain" />
                    <Button rounded style={{alignSelf: 'center', width: '70%', maxWidth: 500, justifyContent:'center', backgroundColor: colors.accentColor}} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{width: '100%', textAlign: 'center'}}>Login</Text>
                    </Button>
                    <Button rounded style={{alignSelf: 'center', width: '70%', maxWidth: 500, justifyContent:'center', marginTop:'3%', backgroundColor: colors.accentColor}} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={{width: '100%', textAlign: 'center'}}>Signup</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}