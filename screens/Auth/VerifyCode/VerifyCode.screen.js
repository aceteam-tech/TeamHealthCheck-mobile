import React from 'react';
import styled from 'styled-components/native'

import {Button, Text, Form, Icon} from 'native-base'
import {KeyboardAvoidingView, Image, View, TouchableOpacity} from 'react-native'
import {Page, PinInput} from '../../../components'

import {verify} from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import {buttonStyle, buttonTextStyle} from '../../../constants/Style'

import IconVerificationCode from './icon-verification-code-2x.png'

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

const button = {
    paddingLeft: '30%',
    paddingRight: '30%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const buttonText = {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold'
}

export default class VerifyCodeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    code = []

    state = {
        code: ['', '', '', '', '', '']
    }

    onCodeChange = async (i, input) => {
        if(input) {
            this.state.code.splice(i, 1, input)
            if (i < 5) {
                this.code[i + 1].focus()
            }
        }
        else if (i === 0) {
            this.state.code.splice(i, 1, '')
            this.code[i].focus()
        }
        else {
            if (!this.state.code[i]) {
                this.state.code.splice(i - 1, 2, '', '')
            } else {
                this.state.code.splice(i, 1, '')
            }
            this.code[i - 1].focus()
        }
        this.setState({
            code: this.state.code
        })
        if(i === 5){
            await this.verify()
        }
    }

    verify = async () => {
        const email = this.props.navigation.getParam('user').username
        const code = this.state.code.join('')
        await verify(email, code)
        this.props.navigation.navigate('Login', {email})
    }

    render () {
        const email = this.props.navigation.getParam('user').username
        const {goBack} = this.props.navigation
        return (
            <Page>
                <View>
                    <TouchableOpacity onPress={() => goBack(null)}>
                        <Icon name='ios-arrow-back'
                              type='Ionicons'
                              style={{color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20}}/>
                    </TouchableOpacity>
                    <Header>
                        <Image source={IconVerificationCode}
                               resizeMode='contain'
                               style={{height: 120}}/>
                        <HeaderText>Verification Code</HeaderText>
                        <Text style={{color: colors.air, marginTop: 16}}>
                            Please type the verification code sent to {email}
                        </Text>
                    </Header>
                </View>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop: 40, marginLeft: 50, marginRight: 50}}>
                        {
                            [0,1,2,3,4,5].map(i => (
                                <PinInput
                                    key={i}
                                    index={i}
                                    autoFocus={i === 0}
                                    value={this.state.code[i]}
                                    handle={(ref) => {this.code[i] = ref}}
                                    onChange={this.onCodeChange}
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
        )
    }
}