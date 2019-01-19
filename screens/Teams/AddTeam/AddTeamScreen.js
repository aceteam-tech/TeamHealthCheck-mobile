import React from 'react';
import {Text, Input, Label, Item, Form} from 'native-base'
import {KeyboardAvoidingView, Image, View} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../constants/Colors'
import {addTeam} from '../../../adapters/api'
import {getSession} from '../../../adapters/auth'
import IconUpload from './upload-2x.png'
import Button from '../../../components/Button/Button.component'
import TeamLogo from '../../../components/TeamLogo/TeamLogo.component'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.primary};
`

const Header = styled.View`
    margin-top: 40px;
    backgroundColor: ${colors.primary};
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex: 1;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const UploadText = styled.Text`
  color: ${colors.air};
`

const UploadButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const Footer = styled.View`
    flex: 3;
    justify-content: flex-end;
    margin-bottom: 30px;
`

const inputStyle = {
    color: colors.air
}

export default class AddTeamScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        name: ''
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    async addTeam () {
        await addTeam(this.state.name)
        this.props.navigation.push('Teams')
    }

    async componentDidMount () {
        const session = await getSession()
        console.log(session);
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>Add New Team</HeaderText>
                </Header>
                <View style={{flex: 6}}>
                    <UploadButton onPress={() => {
                    }}>
                        <Image source={IconUpload}
                               resizeMode='contain'
                               style={{height: 120}}/>
                        <UploadText>Upload team logo</UploadText>
                    </UploadButton>
                    <KeyboardAvoidingView behavior="padding"
                                          keyboardVerticalOffset={20}>
                        <Form style={{justifyContent: 'space-around', marginRight: 15, marginTop: 30}}>
                            <Item>
                                {
                                    !!this.state.name &&
                                    <TeamLogo name={this.state.name} size={50}/>
                                }

                                {/*<Label style={labelStyle}>Team name</Label>*/}
                                <Input style={inputStyle}
                                       autoCorrect={false}
                                       autoCapitalize='words'
                                       textContentType='givenName'
                                       value={this.state.name}
                                       onChangeText={(val) => this.onTextChange('name', val)}/>
                            </Item>
                        </Form>
                    </KeyboardAvoidingView>
                </View>
                <Footer>
                    <Button version='secondary' onPress={() => this.addTeam()} text='Add'/>
                </Footer>
            </Page>
        )
    }
}