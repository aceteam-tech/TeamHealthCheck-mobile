import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Input, Item, Form, Icon, Label } from 'native-base'
import { KeyboardAvoidingView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Page, Loader, Header } from '../../../components'

import { forgotPasswordSubmit } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'

const iconLocker = require('./icon-locker-3x.png')

const PageContent = styled.View`
  flex-grow: 1;
  justify-content: space-between;
`

const Top = styled.View`
  flex: 1;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`

const Footer = styled.View``

const Middle = styled.View`
  flex: 1;
  margin-top: 45px;
`

export default class NewPasswordScreen extends React.Component {
    state = {
        email: '',
        password: '',
        code: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    forgotPassword = async () => {
        try {
            await forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
            this.props.navigation.navigate('Login')
        }
        catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        const email = this.props.navigation.getParam('email')
        email && this.setState({ email })
    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <Loader assetsToLoad={[iconLocker]}>
                <Page dismissKeyboard={true}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="position"
                                          contentContainerStyle={{ flex: 1 }}>
                        <Header title='NEW PASSWORD' left={
                            <TouchableOpacity onPress={() => goBack(null)}>
                                <Icon name='ios-arrow-back'
                                      type='Ionicons'
                                      style={{ color: colors.air, fontSize: 30 }}/>
                            </TouchableOpacity>
                        }/>
                        <PageContent>
                            <Top>
                                <Image source={iconLocker}
                                       resizeMode='contain'
                                       style={{ height: 120 }}/>
                            </Top>
                            <Middle>
                                <Form style={{ marginRight: 15 }}>
                                    <Item floatingLabel>
                                        <Label style={labelStyle}>New Password</Label>
                                        <Input style={inputStyle}
                                               autoCorrect={false}
                                               secureTextEntry
                                               textContentType='password'
                                               value={this.state.password}
                                               returnKeyType='next'
                                               blurOnSubmit={false}
                                               onSubmitEditing={() => this.codeInput.wrappedInstance.focus()}
                                               onChangeText={(val) => this.onTextChange('password', val)}/>
                                    </Item>

                                    <Item floatingLabel>
                                        <Label style={labelStyle}>Verification Code</Label>
                                        <Input style={inputStyle}
                                               getRef={input => this.codeInput = input}
                                               autoCorrect={false}
                                               returnKeyType='done'
                                               keyboardType='number-pad'
                                               textContentType='none'
                                               value={this.state.code}
                                               onSubmitEditing={this.forgotPassword}
                                               onChangeText={(val) => this.onTextChange('code', val)}/>
                                    </Item>
                                </Form>
                            </Middle>
                            <Footer>
                                <Button rounded light onPress={this.forgotPassword} style={buttonStyle}>
                                    <Text style={buttonTextStyle}>{'Done'.toUpperCase()}</Text>
                                </Button>
                            </Footer>
                        </PageContent>
                    </KeyboardAvoidingView>
                </Page>
            </Loader>
        )
    }
}