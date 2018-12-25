import React from 'react';
import {Button, Text, Input, Item, Form} from 'native-base'
import {KeyboardAvoidingView, Image} from 'react-native'
import styled from 'styled-components/native'
import {forgotPassword} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconLogin from '../../assets/images/icon-login-2x.png'
import BgBlueGradient from '../../assets/images/bg-blue-gradient-2x.png'

const Page = styled.ImageBackground`
    flex: 1;
`

const Header = styled.View`
    margin-top: 40px;
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
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

const inputStyle = {
    color: colors.air
}

const inputWrapperStyle = {
    borderBottomWidth: 1,
    borderColor: colors.air
}

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
        await forgotPassword(this.state.email)
    }

    componentDidMount () {
        const email = this.props.navigation.getParam('email')
        email && this.setState({email})
    }

    render () {
        return (
            <Page source={BgBlueGradient}>
                <Header>
                    <HeaderText>{'Forgot password'}</HeaderText>
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item style={inputWrapperStyle}>
                            <Image source={IconLogin}
                                   style={{height: 18, marginLeft: 10}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   autoCorrect={false}
                                   underlineColorAndroid='transparent'
                                   value={this.state.email}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <Button rounded light onPress={this.forgotPassword} style={button}>
                    <Text style={buttonText}>{'Send'.toUpperCase()}</Text>
                </Button>
            </Page>
        )
    }
}