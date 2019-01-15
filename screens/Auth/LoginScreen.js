import React from 'react';
import {Text, Input, Item, Form} from 'native-base'
import {KeyboardAvoidingView, Image} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconLogin from '../../assets/images/icon-login-2x.png'
import IconUser from '../../assets/images/icon-user-2x.png'
import IconPassword from '../../assets/images/icon-password-2x.png'
import Page from '../../components/Page'
import Separator from '../../components/Separator'
import Button from '../../components/Button'

const Header = styled.View`
    margin-top: 40px;
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 25px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const ForgotPassword = NoAccountYet = styled.TouchableOpacity`
  margin-top: 25px;
  justify-content: center;
  align-items: center;
`

const ForgotPasswordText = NoAccountYetText = styled.Text`
  color: #fff;
`

const inputStyle = {
    color: colors.air
}

const inputWrapperStyle = {
    borderBottomWidth: 1,
    borderColor: colors.air
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
        await login(this.state.email, this.state.password)
        this.props.navigation.navigate('AuthLoading', {email: this.state.email})
    }

    forgotPassword = async () => {
        this.props.navigation.navigate('ForgotPassword', {email: this.state.email})
    }

    componentDidMount () {
        this.setState({
            email: this.props.navigation.getParam('email')
        })
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>{'Log In'}</HeaderText>
                    <Image source={IconUser}
                           resizeMode='contain'
                           style={{height: 120}}/>
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 20}}>
                        <Item style={inputWrapperStyle}>
                            <Image source={IconLogin}
                                   style={{height: 18, marginLeft: 10}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   returnKeyType='next'
                                   autoCorrect={false}
                                   underlineColorAndroid='transparent'
                                   value={this.state.email}
                                   onSubmitEditing={() => this.passwordInput.wrappedInstance.focus()}
                                   blurOnSubmit={false}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                        <Item style={inputWrapperStyle}>
                            <Image source={IconPassword}
                                   style={{height: 18, marginLeft: 10}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   secureTextEntry
                                   returnKeyType='send'
                                   ref={input => {this.passwordInput = input}}
                                   textContentType='password'
                                   value={this.state.password}
                                   onSubmitEditing={this.login}
                                   onChangeText={(val) => this.onTextChange('password', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <ForgotPassword onPress={this.forgotPassword}>
                    <ForgotPasswordText>
                        Forgot password?
                    </ForgotPasswordText>
                </ForgotPassword>
                <Footer>
                    <Button onPress={this.login} text='Continue' version='secondary'/>
                    <Separator/>
                    <NoAccountYet onPress={() => this.props.navigation.navigate('Register')}>
                        <NoAccountYetText>
                            Don't have an account yet?
                        </NoAccountYetText>
                    </NoAccountYet>
                </Footer>
            </Page>
        )
    }
}