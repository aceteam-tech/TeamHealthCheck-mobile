import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Form, Icon } from 'native-base'
import { KeyboardAvoidingView, Image, View, TouchableOpacity } from 'react-native'
import { Page, PinInput, Loader } from '../../../components'

import { verify } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle } from '../../../constants/Style'
import { switchInput, updateCode } from './VerifyCode.helpers'

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
    code = []
    codeLength = 6

    state = {
        code: '',
        activeInput: 0
    }

    onKeyPress = async (i, key) => {
        const code = updateCode(this.state.code, key, this.codeLength)
        const activeInputIndex = switchInput(code, this.codeLength)
        this.setState({ code })
        this.code[activeInputIndex].focus()
        if(code.length === this.codeLength){
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
                <Page>
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
                            <Text style={{ color: colors.air, marginTop: 16 }}>
                                Please type the verification code sent to {email}
                            </Text>
                        </Header>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="padding"
                                          keyboardVerticalOffset={20}>
                        <Form style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 40,
                            marginLeft: 50,
                            marginRight: 50
                        }}>
                            {
                                [0, 1, 2, 3, 4, 5].map(i => (
                                    <PinInput
                                        key={i}
                                        index={i}
                                        autoFocus={i === 0}
                                        value={this.state.code[i] || ''}
                                        handle={(ref) => {
                                            this.code[i] = ref
                                        }}
                                        onKeyPress={this.onKeyPress}
                                    />
                                ))
                            }
                        </Form>
                    </KeyboardAvoidingView>
                    <Footer>
                        <Button rounded light onPress={this.verify} style={buttonStyle}>
                            <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                        </Button>
                    </Footer>
                </Page>
            </Loader>
        )
    }
}