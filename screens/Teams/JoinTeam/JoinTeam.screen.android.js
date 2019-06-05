import React from 'react'
import { Button, Text, Input, Item, Form, Label } from 'native-base'
import styled from 'styled-components/native'
import { KeyboardAvoidingView } from 'react-native'
import { joinTeam } from '../../../services/connection/adapters/http-api'
import { buttonStyle, buttonTextStyle, inputStyle, labelStyle } from '../../../constants/Style'
import { Header, Page, ArrowBack } from '../../../components/index'
import teamsStore from '../../../model/team-store'
import colors from '../../../constants/Colors'

const HeaderWrapper = styled.View`
  margin-bottom: 130px;
`

const PageContent = styled.View`
  flex: 1;
  justify-content: space-between;
`

const Top = Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  justify-content: center;
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

    render() {
        const { goBack } = this.props.navigation
        return (
            <Page version={2} dismissKeyboard={true}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                                      behavior="padding">
                    <HeaderWrapper>
                        <Header title='JOIN TEAM' left={<ArrowBack onPress={() => goBack(null)}/>}/>
                    </HeaderWrapper>
                    <PageContent>
                        <Top>
                        </Top>
                        <Middle>
                            <Form style={{ flex: 1, justifyContent: 'space-around', marginRight: 15 }}>
                                <Item floatingLabel>
                                    <Label style={labelStyle}>Insert the team code</Label>
                                    <Input style={inputStyle}
                                           autoCapitalize='none'
                                           keyboardType='decimal-pad'
                                           returnKeyType='send'
                                           autoCorrect={false}
                                           underlineColorAndroid='transparent'
                                           value={this.state.code}
                                           blurOnSubmit={false}
                                           onChangeText={this.onCodeChange}/>
                                </Item>
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