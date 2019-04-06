import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Input, Icon, Item, Form, Label } from 'native-base'
import { KeyboardAvoidingView, Image, View, TouchableOpacity } from 'react-native'
import { Page, Loader } from '../../../components'

import { verify } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'

const iconVerificationCode = require('./icon-verification-code-2x.png')

const Header = styled.View`
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  margin-top: 40px;
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 1;
    justify-content: center;
`

export default class VerifyCodeScreen extends React.Component {
    codeLength = 6
    state = {
        code: ''
    }

    onCodeChange = async (code) => {
        this.setState({
            code
        })
        if (code.length === this.codeLength) {
            await this.verify(code)
        }
    }

    verify = async (code) => {
        const email = this.props.navigation.getParam('user')?.username
        try {
            await verify(email, code)
            this.props.navigation.navigate('Login', { email })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const email = this.props.navigation.getParam('user')?.username
        const { goBack } = this.props.navigation
        return (
            <Loader assetsToLoad={[iconVerificationCode]}>
                <Page dismissKeyboard={true}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="position"
                                          contentContainerStyle={{ flex: 1 }}>
                        <View>
                            <TouchableOpacity onPress={() => goBack(null)}>
                                <Icon name='ios-arrow-back'
                                      type='Ionicons'
                                      style={{ color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20 }}/>
                            </TouchableOpacity>
                            <Header>
                                <Image source={iconVerificationCode}
                                       resizeMode='contain'
                                       style={{ height: 120 }}/>
                                <HeaderText>Verification Code</HeaderText>
                                <Text style={{
                                    color: colors.air,
                                    marginTop: 16,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    textAlign: 'center'
                                }}>
                                    Please type the verification code sent to {email}
                                </Text>
                            </Header>
                        </View>
                        <Form style={{ flex: 1, justifyContent: 'space-around', marginRight: 15 }}>
                            <Item floatingLabel>
                                <Label style={labelStyle}>Verification code</Label>
                                <Input style={inputStyle}
                                       autoCapitalize='none'
                                       keyboardType='email-address'
                                       textContentType='emailAddress'
                                       returnKeyType='send'
                                       autoCorrect={false}
                                       underlineColorAndroid='transparent'
                                       value={this.state.code}
                                       blurOnSubmit={false}
                                       onChangeText={this.onCodeChange}/>
                            </Item>
                        </Form>
                        <Footer>
                            <Button rounded light onPress={this.verify} style={buttonStyle}>
                                <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                            </Button>
                        </Footer>

                    </KeyboardAvoidingView>
                </Page>
            </Loader>
        )
    }
}