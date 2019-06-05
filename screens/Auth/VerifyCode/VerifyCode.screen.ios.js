import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Form } from 'native-base'
import { KeyboardAvoidingView, Image } from 'react-native'
import { Page, PinInput, Loader, Header, ArrowBack } from '../../../components'

import { verify, resendCode } from '../../../services/connection/adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle } from '../../../constants/Style'
import { switchInput, updateCode } from './VerifyCode.helpers'

const verifyCodeIcon = require('./verify-code-3x.png')

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

const HelperText = styled.Text`
  color: ${colors.air}; 
  margin-top: 16px;
  font-size: 17px; 
  font-weight: 200;
  text-align: center
`

const ResendButton = styled.TouchableOpacity``

const ResendText = styled.Text`
  color: ${colors.air}; 
  margin-top: 21px;
  font-size: 16px; 
  font-weight: 600;
  text-align: center
`

export default class VerifyCodeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.email = props.navigation.getParam('email')
        this.state = {
            code: '',
            activeInput: 0,
            codeSent: false
        }
        this.code = []
        this.codeLength = 6
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
        try {
            await verify(this.email, code)
            this.props.navigation.navigate('Login', { email: this.email })
        } catch (e) {
            console.log(e)
        }
    }

    resendCode = async () => {
        try {
            await resendCode(this.email)
            this.setState({
                codeSent: true
            })
            setTimeout(() => {
                this.setState({
                    codeSent: false
                })
            }, 3000)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <Loader assetsToLoad={[verifyCodeIcon]}>
                <Page version={2} dismissKeyboard={true}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="position"
                                          contentContainerStyle={{ flex: 1 }}>
                        <Header title='VERIFICATION CODE' left={<ArrowBack onPress={() => goBack(null)}/>}/>

                        <PageContent>
                            <Top>
                                <Image source={verifyCodeIcon}
                                       resizeMode='contain'
                                       style={{ height: 120, alignSelf: 'center' }}/>
                            </Top>
                            <Middle>
                                <HelperText>
                                    Please type the verification code sent to {this.email}
                                </HelperText>

                                {
                                    this.state.codeSent ?
                                        <ResendText>Code has been sent!</ResendText> :
                                        <ResendButton onPress={this.resendCode}>
                                            <ResendText>Resend code</ResendText>
                                        </ResendButton>
                                }

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