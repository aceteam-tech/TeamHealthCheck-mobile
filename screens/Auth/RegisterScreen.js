import React from 'react';
import {Button, Text, Input, Label, Item, Form, Icon} from 'native-base'
import {KeyboardAvoidingView, Image, View, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {signUp} from '../../adapters/auth'
import colors from '../../constants/Colors'
import {buttonStyle, buttonTextStyle, labelStyle, inputStyle} from '../../constants/Style'
import Page from '../../components/Page'
import IconCreateAccount from '../../assets/images-large/icon-create-account-2x.png'


const Header = styled.View`
    justifyContent: center;
    align-items: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 1;
    justify-content: center;
`

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        name: '',
        email: '',
        password: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    register = async () => {
        const user = await signUp(this.state.email, this.state.password, this.state.name)
        this.props.navigation.navigate('Verify', user)
    }

    render () {
        const {goBack} = this.props.navigation
        return (
            <Page>
                <View>
                    <TouchableOpacity onPress={()=>goBack(null)}>
                        <Icon name='ios-arrow-back'
                              type='Ionicons'
                              style={{color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20}}/>
                    </TouchableOpacity>
                    <Header>
                        <Image source={IconCreateAccount}
                               resizeMode='contain'
                               style={{height: 120}}/>
                        <HeaderText>Create Account</HeaderText>
                    </Header>
                </View>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Full name</Label>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   blurOnSubmit={false}
                                   autoCapitalize='words'
                                   textContentType='givenName'
                                   returnKeyType='next'
                                   value={this.state.name}
                                   onSubmitEditing={() => this.mailInput.wrappedInstance.focus()}
                                   onChangeText={(val) => this.onTextChange('name', val)}/>
                        </Item>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Email</Label>
                            <Input style={inputStyle}
                                   getRef={input => this.mailInput = input}
                                   autoCapitalize='none'
                                   returnKeyType='next'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   autoCorrect={false}
                                   blurOnSubmit={false}
                                   value={this.state.email}
                                   onSubmitEditing={() => this.passwordInput.wrappedInstance.focus()}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Password</Label>
                            <Input style={inputStyle}
                                   getRef={input => this.passwordInput = input}
                                   returnKeyType='send'
                                   autoCorrect={false}
                                   secureTextEntry
                                   textContentType='password'
                                   value={this.state.password}
                                   onSubmitEditing={this.register}
                                   onChangeText={(val) => this.onTextChange('password', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.register} style={buttonStyle}>
                        <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}