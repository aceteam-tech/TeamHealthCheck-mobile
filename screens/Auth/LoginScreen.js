import React from 'react';
import {Input, Item, Form, Icon} from 'native-base'
import {KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconLogin from '../../assets/images-large/icon-login-2x.png'
import IconUser from '../../assets/images-large/icon-user-2x.png'
import IconPassword from '../../assets/images-large/icon-password-2x.png'
import Page from '../../components/Page/Page'
import Separator from '../../components/Separator/Separator'
import Button from '../../components/Button/Button.component'
import Header from '../../components/Header/Header'

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

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

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
        try {
            await login(this.state.email, this.state.password)
            this.props.navigation.navigate('AuthLoading', {email: this.state.email})
        }
        catch (e) {
            console.error(e)
        }
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
        const {goBack} = this.props.navigation
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Log In' left={
                        <TouchableOpacity onPress={() => goBack(null)}>
                            <Icon name='ios-arrow-back'
                                  type='Ionicons'
                                  style={{color: colors.air, fontSize: 30}}/>
                        </TouchableOpacity>
                    } />
                </HeaderWrapper>
                <Image source={IconUser}
                       resizeMode='contain'
                       style={{height: 120, alignSelf: 'center'}}/>
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