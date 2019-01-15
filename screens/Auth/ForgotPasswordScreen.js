import React from 'react'
import {Button, Text, Input, Item, Form, Icon, Label} from 'native-base'
import {KeyboardAvoidingView, Image, TouchableOpacity, View} from 'react-native'
import Page from '../../components/Page'
import styled from 'styled-components/native'
import {forgotPassword} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconKey from "../../assets/images/icon-key-3x.png"

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
    fontSize: 15,
    fontWeight: 'bold'
}

const labelStyle = {
    color: colors.air
}

const inputStyle = {
    color: colors.air
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
                        <Image source={IconKey}
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
                            <Label style={labelStyle}>Email address</Label>
                            <Input style={inputStyle}
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   autoCorrect={false}
                                   value={this.state.email}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.forgotPassword} style={button}>
                        <Text style={buttonText}>{'Send'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}