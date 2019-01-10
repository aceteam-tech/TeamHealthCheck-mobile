import React from 'react';
import {Button, Text, Input, Label, Item, Form, Icon} from 'native-base'
import {KeyboardAvoidingView, Image, View, TouchableOpacity, TextInput} from 'react-native'
import styled from 'styled-components/native'
import {verify} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconVerificationCode from '../../assets/images/icon-verification-code-2x.png'
import Page from '../../components/Page'

const Header = styled.View`
    justifyContent: center;
    align-items: center;
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

const labelStyle = {
    color: colors.air
}

const inputStyle = {
    backgroundColor: colors.air,
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
    fontSize: 36,
    color: colors.primary,
    textAlign: 'center'
}

export default class VerifyCodeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        code: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    verify = async () => {
        await verify(this.state.email, this.state.code)
        this.props.navigation.navigate('Login', {email: this.state.email})
    }

    render () {
        const email = this.props.navigation.getParam('user').email
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
                    <Form style={{flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop: 40}}>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('code', val)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('code', val)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('code', val)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('code', val)}/>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.verify} style={button}>
                        <Text style={buttonText}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}