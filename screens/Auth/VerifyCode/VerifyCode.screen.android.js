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
    state = {
        code: ''
    }

    onCodeChange = (code) => {
        this.setState({
            code
        })
    }

    verify = async () => {
        const email = this.props.navigation.getParam('user')?.username
        try {
            await verify(email, this.state.code)
            this.props.navigation.navigate('Login', { email })
        } catch (e) {
            console.warn(e)
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