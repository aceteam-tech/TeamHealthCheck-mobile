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
    width: 40,
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

    code = []

    state = {
        code: ['', '', '', '', '', '']
    }

    onCodeChange = async (i, key) => {
        if(key !== 'Backspace') {
            this.state.code.splice(i, 1, key)
            if (i < 5 && key) {
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
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   autoFocus={true}
                                   keyboardType='decimal-pad'
                                   value={this.state.code[0]}
                                   maxLength={1}
                                   caretHidden={true}
                                   ref={ref => this.code[0] = ref}
                                   onKeyPress={(e) => this.onCodeChange(0, e.nativeEvent.key)}
                                   onEndEditing={this.onEndEditing}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   caretHidden={true}
                                   value={this.state.code[1]}
                                   onKeyPress={(e) => this.onCodeChange(1, e.nativeEvent.key)}
                                   maxLength={1}
                                   ref={ref => this.code[1] = ref}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.code[2]}
                                   caretHidden={true}
                                   ref={ref => this.code[2] = ref}
                                   maxLength={1}
                                   onKeyPress={(e) => this.onCodeChange(2, e.nativeEvent.key)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.code[3]}
                                   caretHidden={true}
                                   ref={ref => this.code[3] = ref}
                                   maxLength={1}
                                   onKeyPress={(e) => this.onCodeChange(3, e.nativeEvent.key)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.code[4]}
                                   caretHidden={true}
                                   ref={ref => this.code[4] = ref}
                                   maxLength={1}
                                   onKeyPress={(e) => this.onCodeChange(4, e.nativeEvent.key)}/>
                        <TextInput style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.code[5]}
                                   caretHidden={true}
                                   ref={ref => this.code[5] = ref}
                                   maxLength={1}
                                   onKeyPress={(e) => this.onCodeChange(5, e.nativeEvent.key)}/>
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