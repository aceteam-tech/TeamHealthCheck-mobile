import React from 'react';
import {Button, Text, Input, Label, Item, Form} from 'native-base'
import {KeyboardAvoidingView, Image, AsyncStorage} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../adapters/auth'
import colors from '../constants/Colors'
import AvatarPlaceholder from '../assets/images/avatar-placeholder-2x.png'
import IconLogin from '../assets/images/icon-login-2x.png'
import IconPassword from '../assets/images/icon-password-2x.png'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.primary};
`

const Header = styled.View`
    margin-top: 40px;
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const buttonText = {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold'
}

const labelStyle = {
    color: colors.air
}

const inputStyle = {
    color: colors.air
}

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        password: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    login = async () => {
        const accessToken = await login(this.state.email, this.state.password)
        await AsyncStorage.setItem('userToken', accessToken);
        this.props.navigation.navigate('AuthLoading', {email: this.state.email})
    }

    componentDidMount(){
        const user = this.props.navigation.getParam('user')
        this.setState({
            email: user && user.username || 'privoskar@gmail.com'
        })
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>{'log in'.toUpperCase()}</HeaderText>
                    <Image source={AvatarPlaceholder}
                           resizeMode='contain'
                           style={{height: 150}}/>
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item>
                            <Image source={IconLogin}
                                   style={{height: 18}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   autoCorrect={false}
                                   value={this.state.email}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                        <Item>
                            <Image source={IconPassword}
                                   style={{height: 18}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   secureTextEntry
                                   textContentType='password'
                                   value={this.state.password}
                                   onChangeText={(val) => this.onTextChange('password', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.login} style={button}>
                        <Text style={buttonText}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}