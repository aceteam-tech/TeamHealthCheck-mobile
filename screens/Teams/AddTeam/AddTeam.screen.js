import React from 'react'
import { Input, Label, Item, Form, Icon } from 'native-base'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { addTeam } from '../../../adapters/api'
import { Button, Header, Page, TeamLogo } from '../../../components'
import { labelStyle, inputStyle } from '../../../constants/Style'

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

const PageContent = styled.View`
  flex: 1;
  justify-content: space-between;
`
const Top = styled.View`
  justify-content: center;
  align-items: center;
`
const Footer = styled.View``
const Middle = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 45px;
`

export default class AddTeamScreen extends React.Component {
    state = {
        name: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    async addTeam() {
        await addTeam(this.state.name)
        this.props.navigation.push('Teams')
    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <Page dismissKeyboard={true}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                                      behavior="position"
                                      contentContainerStyle={{ flex: 1 }}>
                    <HeaderWrapper>
                        <Header title='Add Team' left={
                            <TouchableOpacity onPress={() => goBack(null)}>
                                <Icon name='ios-arrow-back'
                                      type='Ionicons'
                                      style={{ color: '#FFF', fontSize: 30 }}/>
                            </TouchableOpacity>
                        }/>
                    </HeaderWrapper>

                    <PageContent>
                        <Top>
                            <TeamLogo name={this.state.name} size={100}/>
                        </Top>
                        <Middle>
                            <Form style={{ justifyContent: 'center', marginRight: 15 }}>
                                <Item floatingLabel>
                                    <Label style={labelStyle}>Team name</Label>
                                    <Input style={inputStyle}
                                           autoCorrect={false}
                                           autoCapitalize='words'
                                           textContentType='givenName'
                                           value={this.state.name}
                                           onChangeText={(val) => this.onTextChange('name', val)}/>
                                </Item>
                            </Form>
                        </Middle>
                        <Footer>
                            <Button version='secondary' onPress={() => this.addTeam()} text='Add'/>
                        </Footer>
                    </PageContent>

                </KeyboardAvoidingView>
            </Page>
        )
    }
}