import React from 'react'
import styled from 'styled-components/native'

import { Button, Text, Input, Item, Form, Icon, Label } from 'native-base'
import { KeyboardAvoidingView, Image, TouchableOpacity, View } from 'react-native'
import { Page } from '../../../components'

import { forgotPassword } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'

import IconKey from "./icon-key-3x.png"

const Header = styled.View`
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  margin-top: 80px;
  font-size: 25px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 1;
    justify-content: center;
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
            <Page>
                <KeyboardAvoidingView style={{ flex: 1 }}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <View>
                        <TouchableOpacity onPress={() => goBack(null)}>
                            <Icon name='ios-arrow-back'
                                  type='Ionicons'
                                  style={{ color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20 }}/>
                        </TouchableOpacity>
                        <Header>
                            <Image source={IconKey}
                                   resizeMode='contain'
                                   style={{ height: 120 }}/>
                            <HeaderText>Change Password</HeaderText>
                        </Header>
                    </View>
                    <Form style={{ flex: 1, justifyContent: 'space-around', marginRight: 15 }}>
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
                    <Footer>
                        <Button rounded light onPress={this.forgotPassword} style={buttonStyle}>
                            <Text style={buttonTextStyle}>{'Send'.toUpperCase()}</Text>
                        </Button>
                    </Footer>
                </KeyboardAvoidingView>
            </Page>
        )
    }
}