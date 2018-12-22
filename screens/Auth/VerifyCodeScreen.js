import React from 'react';
import {Button, Text, Input, Label, Item, Form} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import {verify} from '../../adapters/auth'
import colors from '../../constants/Colors'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.primary};
`

const Header = styled.View`
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: center;
    align-items: center;
    flex: 1;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
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
    color: colors.air
}

export default class VerifyCodeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
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

    componentDidMount(){
        this.setState({
            email: this.props.navigation.getParam('user').username
        })
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>Verify Account</HeaderText>
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Email</Label>
                            <Input style={inputStyle}
                                   autoCapitalize='none'
                                   keyboardType='email-address'
                                   textContentType='emailAddress'
                                   autoCorrect={false}
                                   value={this.state.email}
                                   onChangeText={(val) => this.onTextChange('email', val)}/>
                        </Item>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Code</Label>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   keyboardType='decimal-pad'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('code', val)}/>
                        </Item>
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