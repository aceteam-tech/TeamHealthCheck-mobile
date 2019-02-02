import React from 'react';
import {KeyboardAvoidingView, View} from "react-native";
import {Form, Input, Item, Label} from "native-base";
import Page from '../../components/Page';
import styled from "styled-components/native/dist/styled-components.native.esm";
import Button from "../../components/Button/Button.component";
import teamStore from '../../model/team-store'
import {labelStyle} from "../../constants/Style";
import colors from "../../constants/Colors";

const Header = styled.View`
    margin-top: 10px;
    justify-content: center;
    flex-direction: row;
    flex: 1;
`
const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`
const Footer = styled.View`
    flex: 3;
    justify-content: flex-end;
    margin-bottom: 30px;
`
const CodeLabel = styled.Text`
    color: ${colors.air};
    font-size: 18px;
    margin: 0 0 10px 15px;
`

const Code = styled.Text`
    color: ${colors.air};
    font-size: 50px;
    letter-spacing: 12px;
    font-weight: bold;
    textAlign: center;
`
const OrText = styled.Text`
    color: ${colors.air};
    margin: 40px 0;
    font-size: 15px;
    textAlign: center;
`

const inputStyle = {
    color: colors.air
}

export default class InviteScreen extends React.Component {

    state = {
        email: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>Invitation</HeaderText>
                </Header>
                <View style={{flex: 2}}>
                    <KeyboardAvoidingView behavior="padding"
                                          keyboardVerticalOffset={20}>

                        <CodeLabel style={labelStyle}>Join using the code</CodeLabel>
                        <Code>{teamStore.team.invitationCode}</Code>
                        <OrText>Or</OrText>
                        <Form style={{justifyContent: 'space-around', marginRight: 15, marginTop: 30}}>
                            <Item>
                                <Label style={labelStyle}>Invite via email</Label>
                                <Input style={inputStyle}
                                       autoCorrect={false}
                                       autoCapitalize='words'
                                       textContentType='emailAddress'
                                       value={this.state.email}
                                       onChangeText={(val) => this.onTextChange('email', val)}/>
                            </Item>
                        </Form>
                    </KeyboardAvoidingView>
                </View>
                <Footer>
                    <Button version='secondary' onPress={() => {console.log(teamStore.team.invitationCode)}} text='Send'/>
                </Footer>
            </Page>
        )
    }
}