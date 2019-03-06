import React from 'react';
import {Button, Text, Form, Icon} from 'native-base'
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {joinTeam} from '../../../adapters/api'
import colors from '../../../constants/Colors'
import {buttonStyle, buttonTextStyle} from '../../../constants/Style'
import {Header, Page, PinInput} from '../../../components/index'
import teamsStore from '../../../model/team-store'

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
        const code = this.state.code.join('')
        const team = await joinTeam(code)
        teamsStore.setTeam(team)
        this.props.navigation.navigate('TeamDashboard')
    }

    render () {
        const {goBack} = this.props.navigation
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Join Team' left={
                        <TouchableOpacity onPress={() => goBack(null)}>
                            <Icon name='ios-arrow-back'
                                  type='Ionicons'
                                  style={{color: colors.air, fontSize: 30}}/>
                        </TouchableOpacity>
                    } />
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
                                    value={this.state.code[i]}
                                    handle={(ref) => {this.code[i] = ref}}
                                    onChange={this.onCodeChange}
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