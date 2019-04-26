import React from 'react';
import { Button, Text, Input, Item, Form, Label } from 'native-base'
import styled from 'styled-components/native'
import {joinTeam} from '../../../adapters/api'
import { buttonStyle, buttonTextStyle, inputStyle, labelStyle } from '../../../constants/Style'
import {Header, Page, ArrowBack} from '../../../components/index'
import teamsStore from '../../../model/team-store'

const Footer = styled.View`
    flex: 1;
    justify-content: center;
`

const HeaderWrapper = styled.View`
  margin-bottom: 130px;
`


export default class VerifyCodeScreen extends React.Component {
    codeLength = 6
    state = {
        code: ''
    }

    onCodeChange = async (code) => {
        this.setState({
            code
        })
        if (code.length === this.codeLength) {
            await this.verify(code)
        }
    }

    verify = async (code) => {
        try {
            const team = await joinTeam(code)
            teamsStore.setTeam(team)
            this.props.navigation.navigate('TeamDashboard')
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        const {goBack} = this.props.navigation
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Join Team' left={<ArrowBack onPress={() => goBack(null)}/>} />
                </HeaderWrapper>
                <Form style={{ flex: 1, justifyContent: 'space-around', marginRight: 15 }}>
                    <Item floatingLabel>
                        <Label style={labelStyle}>Join your team code</Label>
                        <Input style={inputStyle}
                               autoCapitalize='none'
                               keyboardType='email-address'
                               textContentType='emailAddress'
                               returnKeyType='send'
                               autoCorrect={false}
                               underlineColorAndroid='transparent'
                               value={this.state.code}
                               blurOnSubmit={false}
                               onChangeText={this.onCodeChange}/>
                    </Item>
                </Form>
                <Footer>
                    <Button rounded light onPress={this.verify} style={buttonStyle}>
                        <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}