import React from 'react';
import {Button, Text, Form} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import {joinTeam} from '../../../services/connection/adapters/http-api'
import colors from '../../../constants/Colors'
import { buttonStyle, buttonTextStyle } from '../../../constants/Style'
import {Header, Page, PinInput, ArrowBack} from '../../../components/index'
import teamsStore from '../../../model/teams-store'
import { switchInput, updateCode } from '../../Auth/VerifyCode/VerifyCode.helpers'

const HeaderWrapper = styled.View`
  margin-bottom: 130px;
`

const CodeLabel = styled.Text`
    color: ${colors.air};
    font-size: 17px;
    font-weight: 300;
    margin: 0 0 10px 15px;
    align-self: center;
`

const PageContent = styled.View`
  flex: 1;
  justify-content: space-between;
`

const Top = Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 45px;
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
            await teamsStore.joinTeam(code)
            this.props.navigation.navigate('TeamDashboard')
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        const {goBack} = this.props.navigation
        return (
            <Page version={2} dismissKeyboard={true}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                                      behavior="padding">
                <HeaderWrapper>
                    <Header title='JOIN TEAM' left={<ArrowBack onPress={() => goBack(null)}/>} />
                </HeaderWrapper>
                <PageContent>
                    <Top>
                    </Top>
                    <Middle>
                        <CodeLabel>Insert the team code</CodeLabel>
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
                    </Middle>
                    <Footer>
                        <Button rounded light onPress={this.verify} style={buttonStyle}>
                            <Text style={buttonTextStyle}>{'Continue'.toUpperCase()}</Text>
                        </Button>
                    </Footer>

                </PageContent>
                </KeyboardAvoidingView>
            </Page>
        )
    }
}