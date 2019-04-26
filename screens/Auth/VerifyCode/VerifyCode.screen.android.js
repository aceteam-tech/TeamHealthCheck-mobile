import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Input, Icon, Item, Form, Label } from 'native-base'
import { KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { Page, Loader, Header } from '../../../components'

import { verify } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'

const iconVerificationCode = require('./icon-verification-code-2x.png')

const Top = Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  margin-top: 45px;
  margin-bottom: 20px;
`

const PageContent = styled.View`
  flex: 1;
  margin-top: 40px;
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
        const email = this.props.navigation.getParam('email')
        try {
            await verify(email, code)
            this.props.navigation.navigate('Login', { email })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const email = this.props.navigation.getParam('email')
        const { goBack } = this.props.navigation
        return (
            <Loader assetsToLoad={[iconVerificationCode]}>
                <Page dismissKeyboard={true}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="position"
                                          contentContainerStyle={{ flex: 1 }}>
                        <Header title='VERIFICATION CODE' left={
                            <TouchableOpacity onPress={() => goBack(null)}>
                                <Icon name='ios-arrow-back'
                                      type='Ionicons'
                                      style={{ color: colors.air, fontSize: 30 }}/>
                            </TouchableOpacity>
                        }/>
                        <PageContent>
                            <Top>
                                <Image source={iconVerificationCode}
                                       resizeMode='contain'
                                       style={{ height: 120, alignSelf: 'center' }}/>
                            </Top>
                            <Middle>
                                <Text style={{ color: colors.air, marginTop: 16, textAlign: 'center' }}>
                                    Please type the verification code sent to {email}
                                </Text>
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
                            </Middle>
                            <Footer>
                                <Button rounded light onPress={this.verify} style={buttonStyle}>
                                    <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                                </Button>
                            </Footer>
                        </PageContent>
                    </KeyboardAvoidingView>
                </Page>
            </Loader>
        )
    }
}