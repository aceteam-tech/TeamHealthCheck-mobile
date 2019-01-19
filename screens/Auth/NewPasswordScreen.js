import React from 'react'
import {Button, Text, Input, Item, Form, Icon, Label} from 'native-base'
import {KeyboardAvoidingView, Image, TouchableOpacity, View} from 'react-native'
import Page from '../../components/Page'
import styled from 'styled-components/native'
import {forgotPasswordSubmit} from '../../adapters/auth'
import colors from '../../constants/Colors'
import {buttonStyle, buttonTextStyle, labelStyle, inputStyle} from '../../constants/Style'
import IconLocker from "../../assets/images-x-large/icon-locker-3x.png"

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
        try{
            await forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
            this.props.navigation.navigate('Login')
        }
        catch (e) {
         console.error(e)
        }
    }

    componentDidMount() {
        const email = this.props.navigation.getParam('email')
        email && this.setState({email})
    }

    render() {
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
                        <Image source={IconLocker}
                               resizeMode='contain'
                               style={{height: 120}}/>
                        <HeaderText>Forgot Password?</HeaderText>
                        <Text style={{color: colors.air, marginTop: 16, fontSize: 15}}>
                            Don't you worry, we got you.
                        </Text>
                    </Header>
                </View>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
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
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.forgotPassword} style={buttonStyle}>
                        <Text style={buttonTextStyle}>{'Done'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}