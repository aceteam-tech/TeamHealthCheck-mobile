import React from 'react'
import styled from 'styled-components/native'

import { Input, Item, Form, Icon, Label } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import { Button, Header, Page, Loader } from '../../../components'

import { login } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { labelStyle, inputStyle } from '../../../constants/Style'
import appStore from '../../../model/app.store'

const loginImage = require('./login-image-2x.png')

const ForgotPassword = styled.TouchableOpacity`
  margin-top: 25px;
  justify-content: center;
  align-items: center;
`

const NoAccountYet = styled.TouchableOpacity`
  margin-bottom: 25px;
  justify-content: center;
  align-items: center;
`

const ForgotPasswordText = styled.Text`
  color: ${colors.air};
  font-weight: 600;
  font-size: 15px;
`

const NoAccountYetText = styled.Text`
  color: ${colors.air};
  font-size: 16px;
  font-weight: 300;
`

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

const PageContent = styled.View`
  flex: 1;
  justify-content: space-between;
`

const Top = Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  margin-top: 45px;
`

const formItemStyle = {
    marginTop: 10,
    marginBottom: 10,
}

export default class LoginScreen extends React.Component {
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
            this.props.navigation.navigate('AuthLoading', { email: this.state.email })
        }
        catch (e) {
            console.log({'e': e});
        }
    }

    forgotPassword = async () => {
        this.props.navigation.navigate('ForgotPassword', { email: this.state.email })
    }

    componentDidMount() {
        this.setState({
            email: this.props.navigation.getParam('email')
        })
        appStore.navigation = this.props.navigation
    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <Loader assetsToLoad={[loginImage]}>
                <Page version={2}>
                    <HeaderWrapper>
                        <Header title='LOG IN' left={
                            <TouchableOpacity onPress={() => goBack(null)}>
                                <Icon name='ios-arrow-back'
                                      type='Ionicons'
                                      style={{ color: colors.air, fontSize: 30 }}/>
                            </TouchableOpacity>
                        }/>
                    </HeaderWrapper>
                    <PageContent>
                        <Top>
                            <Image source={loginImage}
                                   resizeMode='contain'
                                   style={{ height: 120, alignSelf: 'center' }}/>
                        </Top>
                        <Middle>
                            <Form style={{ justifyContent: 'center', marginRight: 20 }}>
                                <Item floatingLabel style={formItemStyle}>
                                    <Label style={labelStyle}>Email</Label>
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
                                <Item floatingLabel style={formItemStyle}>
                                    <Label style={labelStyle}>Password</Label>
                                    <Input style={inputStyle}
                                           secureTextEntry
                                           returnKeyType='send'
                                           getRef={input => {this.passwordInput = input}}
                                           textContentType='password'
                                           value={this.state.password}
                                           onSubmitEditing={this.login}
                                           onChangeText={(val) => this.onTextChange('password', val)}/>
                                </Item>
                            </Form>
                            <ForgotPassword onPress={this.forgotPassword}>
                                <ForgotPasswordText>
                                    Forgot password?
                                </ForgotPasswordText>
                            </ForgotPassword>
                        </Middle>
                        <Footer>
                            <Button onPress={this.login} text='Continue' version='secondary'/>
                            <NoAccountYet onPress={() => this.props.navigation.navigate('Register')}>
                                <NoAccountYetText>
                                    Don't have an account yet?
                                </NoAccountYetText>
                            </NoAccountYet>
                        </Footer>

                    </PageContent>
                </Page>
            </Loader>
        )
    }
}