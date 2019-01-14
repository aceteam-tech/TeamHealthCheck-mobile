import React from 'react';
import {Text, Input, Item, Form} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Button from '../../components/Button'

const Header = styled.View`
    margin-top: 40px;
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

export default class HealthCheckScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>Health Check</HeaderText>
                </Header>
                <Text>
                    There is no active health check at the moment.
                </Text>
                <Footer>
                    <Button onPress={f=>f} text='Start Health Check' version='secondary'/>
                </Footer>
            </Page>
        )
    }
}