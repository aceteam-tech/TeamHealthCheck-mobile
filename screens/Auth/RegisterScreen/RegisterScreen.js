import React from 'react';
import { Button, Text, Input, Label, Item, Form, Icon } from 'native-base'
import { KeyboardAvoidingView, Image, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { signUp } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'
import Page from '../../../components/Page'
import IconCreateAccount from '../../../assets/images-large/icon-id-2x.png'
import registerFormStore from './register.store'
import { observer } from 'mobx-react/native';

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

const ErrorText = styled.Text`
  color: ${colors.air};
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`

const Footer = styled.View`
    flex: 1;
    justify-content: center;
`

const registerFn = async (navigate) => {
    const { name, email, password } = registerFormStore.form
    const user = await signUp(email, password, name)
    registerFormStore.clear()
    navigate('Verify', user)
}

export default observer(({ navigation }) => {
    const { goBack } = navigation
    const { name, email, password } = registerFormStore.form
    const { errors, formValidated } = registerFormStore
    let refs = { email, password }
    const register = registerFn.bind(null, navigation.navigate)

    return (
        <Page>
            <View>
                <TouchableOpacity onPress={() => goBack(null)}>
                    <Icon name='ios-arrow-back'
                          type='Ionicons'
                          style={{ color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20 }}/>
                </TouchableOpacity>
                <Header>
                    <Image source={IconCreateAccount}
                           resizeMode='contain'
                           style={{ height: 120 }}/>
                    <HeaderText>Create Account</HeaderText>
                </Header>
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }}
                                  behavior="padding"
                                  keyboardVerticalOffset={20}>
                <Form style={{ flex: 1, justifyContent: 'space-around', marginRight: 15 }}>
                    <Item floatingLabel>
                        <Label style={labelStyle}>Full name</Label>
                        <Input style={inputStyle}
                               autoCorrect={false}
                               blurOnSubmit={false}
                               autoCapitalize='words'
                               textContentType='givenName'
                               returnKeyType='next'
                               value={name}
                               onSubmitEditing={() => refs.email.wrappedInstance.focus()}
                               onChangeText={(val) => registerFormStore.fieldChange('name', val)}/>
                    </Item>
                    <ErrorText>{errors.name}</ErrorText>
                    <Item floatingLabel>
                        <Label style={labelStyle}>Email</Label>
                        <Input style={inputStyle}
                               getRef={ref => refs.email = ref}
                               autoCapitalize='none'
                               returnKeyType='next'
                               keyboardType='email-address'
                               textContentType='emailAddress'
                               autoCorrect={false}
                               blurOnSubmit={false}
                               value={email}
                               onSubmitEditing={() => refs.password.wrappedInstance.focus()}
                               onChangeText={(val) => registerFormStore.fieldChange('email', val)}/>
                    </Item>
                    <ErrorText>{errors.email}</ErrorText>
                    <Item floatingLabel>
                        <Label style={labelStyle}>Password</Label>
                        <Input style={inputStyle}
                               getRef={ref => refs.password = ref}
                               returnKeyType='send'
                               autoCorrect={false}
                               secureTextEntry
                               textContentType='password'
                               value={password}
                               onSubmitEditing={register}
                               onChangeText={(val) => registerFormStore.fieldChange('password', val)}/>
                    </Item>
                    <ErrorText>{errors.password}</ErrorText>
                </Form>
            </KeyboardAvoidingView>
            <Footer>
                {
                    !!formValidated &&
                    <Button rounded light onPress={register} style={buttonStyle}>
                        <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                }
            </Footer>
        </Page>
    )
})