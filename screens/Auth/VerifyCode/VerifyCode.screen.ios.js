import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Form } from 'native-base'
import { KeyboardAvoidingView, Image } from 'react-native'
import { Page, PinInput, Loader, Header, ArrowBack } from '../../../components'

import { verify } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle } from '../../../constants/Style'
import { switchInput, updateCode } from './VerifyCode.helpers'

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
                        <Header title='VERIFICATION CODE' left={<ArrowBack onPress={() => goBack(null)}/>}/>

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