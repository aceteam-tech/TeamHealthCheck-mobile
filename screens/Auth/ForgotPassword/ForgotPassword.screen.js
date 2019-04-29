import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Input, Item, Form, Label } from 'native-base'
import { KeyboardAvoidingView, Image } from 'react-native'
import { Page, Header, Loader, ArrowBack } from '../../../components'

import { forgotPassword } from '../../../adapters/auth'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'

import forgotPasswordIcon from "./forgot-password-icon-3x.png"

const PageContent = styled.View`
  flex: 1;
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

export default class ForgotPasswordScreen extends React.Component {
    state = {
        email: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    forgotPassword = async () => {
        try {
            await forgotPassword(this.state.email)
            this.props.navigation.navigate('NewPassword', { email: this.state.email })
        } catch (e) {
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
            <Loader assetsToLoad={[forgotPasswordIcon]}>
                <Page version={2} dismissKeyboard={true}>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                                          behavior="position"
                                          contentContainerStyle={{ flex: 1 }}>
                        <Header title='RESET PASSWORD' left={<ArrowBack onPress={() => goBack(null)}/>}/>
                        <PageContent>
                            <Top>
                                <Image source={forgotPasswordIcon}
                                       resizeMode='contain'
                                       style={{ height: 120 }}/>
                            </Top>
                            <Middle>
                                <Form style={{ flex: 1, marginRight: 15 }}>
                                    <Item floatingLabel>
                                        <Label style={labelStyle}>Email address</Label>
                                        <Input style={inputStyle}
                                               autoCapitalize='none'
                                               returnKeyType='send'
                                               keyboardType='email-address'
                                               textContentType='emailAddress'
                                               autoCorrect={false}
                                               value={this.state.email}
                                               onSubmitEditing={this.forgotPassword}
                                               onChangeText={(val) => this.onTextChange('email', val)}/>

                                    </Item>
                                </Form>
                            </Middle>
                            <Footer>
                                <Button rounded light onPress={this.forgotPassword} style={buttonStyle}>
                                    <Text style={buttonTextStyle}>{'Send'.toUpperCase()}</Text>
                                </Button>
                            </Footer>
                        </PageContent>
                    </KeyboardAvoidingView>
                </Page>
            </Loader>
        )
    }
}