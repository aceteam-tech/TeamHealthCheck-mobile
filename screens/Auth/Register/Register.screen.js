import React from 'react'
import styled from 'styled-components/native'
import { observer } from 'mobx-react/native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text, Input, Label, Item, Form, Icon } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import { Page, Loader, Header } from '../../../components'

import { signUp } from '../../../adapters/auth'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle, labelStyle, inputStyle } from '../../../constants/Style'
import registerFormStore from './register.store'

const registerImage = require('./register-image-2x.png')

const Top = Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  margin-top: 45px;
  margin-bottom: 20px;
`

const PageContent = styled.View`
  flex: 1;
  margin-top: 40px;
`

const ErrorText = styled.Text`
  color: ${colors.air};
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`

const registerFn = async (navigate) => {
    const { name, email, password } = registerFormStore.form
    try{
        const user = await signUp(email, password, name)
        registerFormStore.clear()
        navigate('Verify', user)
    } catch(e) {
        console.log(e)
    }
}

export default observer(({ navigation }) => {
    const { goBack } = navigation
    const { name, email, password } = registerFormStore.form
    const { errors, formValidated } = registerFormStore
    let refs = { email, password }
    const register = registerFn.bind(null, navigation.navigate)

    return (
        <Loader assetsToLoad={[registerImage]}>
            <Page version={2}>
                <Header title='CREATE ACCOUNT' left={
                    <TouchableOpacity onPress={() => goBack(null)}>
                        <Icon name='ios-arrow-back'
                              type='Ionicons'
                              style={{ color: colors.air, fontSize: 30 }}/>
                    </TouchableOpacity>
                }/>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
                    <PageContent>
                        <Top>
                            <Image source={registerImage}
                                   resizeMode='contain'
                                   style={{ height: 120, alignSelf: 'center' }}/>
                        </Top>
                        <Middle>
                            <Form style={{ justifyContent: 'center', marginRight: 15 }}>
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
                        </Middle>
                        <Footer>
                            {
                                !!formValidated &&
                                <Button rounded light onPress={register} style={buttonStyle}>
                                    <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                                </Button>
                            }
                        </Footer>
                    </PageContent>
                </KeyboardAwareScrollView>
            </Page>
        </Loader>
    )
})