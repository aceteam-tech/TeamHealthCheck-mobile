import React from 'react';
import {Button, Text, Form} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import {joinTeam} from '../../../adapters/api'
import colors from '../../../constants/Colors'
import {buttonStyle, buttonTextStyle} from '../../../constants/Style'
import {Header, Page, PinInput, ArrowBack} from '../../../components/index'
import teamsStore from '../../../model/team-store'
import { switchInput, updateCode } from '../../Auth/VerifyCode/VerifyCode.helpers'

const Footer = styled.View`
    flex: 1;
    justify-content: center;
`

const HeaderWrapper = styled.View`
  margin-bottom: 130px;
`

const CodeLabel = styled.Text`
    color: ${colors.air};
    font-size: 13px;
    margin: 0 0 10px 15px;
`

export default class VerifyCodeScreen extends React.Component {
    code = []
    codeLength = 6

    state = {
        code: '',
        activeInput: 0
    }

    onKeyPress = async (i, key) => {
        const code = updateCode(this.state.code, key, this.codeLength)
        const activeInputIndex = switchInput(code, this.codeLength)
        this.setState({ code })
        this.code[activeInputIndex].focus()
        if(code.length === this.codeLength){
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
                <CodeLabel>Join your team code</CodeLabel>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'center', flexDirection: 'row', marginLeft: 50, marginRight: 50}}>
                        {
                            [0,1,2,3,4,5].map(i => (
                                <PinInput
                                    key={i}
                                    index={i}
                                    autoFocus={i === 0}
                                    value={this.state.code[i] || ''}
                                    handle={(ref) => {
                                        this.code[i] = ref
                                    }}
                                    onKeyPress={this.onKeyPress}
                                />
                            ))
                        }
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.verify} style={buttonStyle}>
                        <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}