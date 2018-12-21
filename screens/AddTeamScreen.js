import React from 'react';
import {Button, Text, Input, Label, Item, Form} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import {addTeam} from '../adapters/api'
import {getSession} from '../adapters/auth'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.primary};
`

const Header = styled.View`
    margin-top: 40px;
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const buttonText = {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold'
}

const labelStyle = {
    color: colors.air
}

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

    async addTeam(){
        await addTeam(this.state.name)
        this.props.navigation.push('Home')
    }
    
    async componentDidMount() {
        const session = await getSession()
        console.log(session);
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>{`add a team`.toUpperCase()}</HeaderText>
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Name</Label>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   autoCapitalize='words'
                                   textContentType='givenName'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('name', val)}/>
                        </Item>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={()=>this.addTeam()} style={button}>
                        <Text style={buttonText}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}