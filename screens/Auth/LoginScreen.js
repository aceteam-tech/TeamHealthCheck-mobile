import React from 'react';
import {Button, Text, Input, Item, Form} from 'native-base'
import {KeyboardAvoidingView, Image} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconLogin from '../../assets/images/icon-login-2x.png'
import IconUser from '../../assets/images/icon-user-2x.png'
import IconPassword from '../../assets/images/icon-password-2x.png'
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

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const ForgotPassword = NoAccountYet = styled.TouchableOpacity`
  margin-top: 25px;
  justify-content: center;
  align-items: center;
`

const ForgotPasswordText = NoAccountYetText = styled.Text`
  color: #fff;
`

const Separator = styled.View`
  border-color: white;
  border-bottom-width: 1px;
  width: 20%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
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

const labelStyle = {
    color: colors.air
}

const inputStyle = {
    color: colors.air
}

const inputWrapperStyle = {
    borderBottomWidth: 1,
    borderColor: colors.air
}

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        password: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    login = async () => {
        await login(this.state.email, this.state.password)
        this.props.navigation.navigate('AuthLoading', {email: this.state.email})
    }

    forgotPassword = async () => {
        this.props.navigation.navigate('ForgotPassword', {email: this.state.email})
    }

    componentDidMount () {
        const user = this.props.navigation.getParam('user')
        if (user) {
            this.setState({
                email: user.username
            })
        }
    }

    render () {
        return (
            <Page source={BgBlueGradient}>
                <Header>
                    <HeaderText>{'Log In'}</HeaderText>
                    <Image source={IconUser}
                           resizeMode='contain'
                           style={{height: 120}}/>
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
                        <Item style={inputWrapperStyle}>
                            <Image source={IconPassword}
                                   style={{height: 18, marginLeft: 10}}
                                   resizeMode='contain'/>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   secureTextEntry
                                   textContentType='password'
                                   value={this.state.password}
                                   onChangeText={(val) => this.onTextChange('password', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <ForgotPassword onPress={this.forgotPassword}>
                    <ForgotPasswordText>
                        Forgot password?
                    </ForgotPasswordText>
                </ForgotPassword>
                <Footer>
                    <Button rounded light onPress={this.login} style={button}>
                        <Text style={buttonText}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                    <Separator />
                    <NoAccountYet onPress={()=>this.props.navigation.navigate('Register')}>
                        <NoAccountYetText>
                            Don't have an account yet?
                        </NoAccountYetText>
                    </NoAccountYet>
                </Footer>
            </Page>
        )
    }
}