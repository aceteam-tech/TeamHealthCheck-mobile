import React from 'react';
import {Button, Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.air};
    justifyContent: space-between;
`

const TeamIconWrapper = styled.View`
    flex: 1;
    marginRight: 20;
`

const TeamIcon = styled.Image`
    width: 50; 
    height: 50;
`

const Header = styled.View`
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const TeamsList = styled.View`
  margin-top: -30px;
`

const squadCardStyles = {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    height: 120,
    justifyContent: 'center',
    marginBottom: 15
}

const buttonText = {
    color: colors.air,
    fontSize: 12,
    fontWeight: 'bold'
}

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    backgroundColor: 'rgb(32,36,46)',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10
}

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render () {
        const team = this.props.navigation.getParam('team')
        return (
            <Page>
                {
                    !!team &&
                    <Content>
                        <Header>
                            <HeaderText>Team</HeaderText>
                        </Header>
                        <TeamsList>
                            <Card style={squadCardStyles}>
                                <CardItem style={cardItemStyles}>
                                    {
                                        !!team.image &&
                                        <TeamIconWrapper>
                                            <TeamIcon
                                                source={{uri: team.image}}/>
                                        </TeamIconWrapper>
                                    }
                                    <Text style={[
                                        {
                                            flex: 2,
                                            color: colors.primary,
                                            fontSize: 20
                                        },
                                        !team.image && {textAlign: 'center'}
                                    ]}>{team.name}</Text>
                                </CardItem>
                            </Card>
                        </TeamsList>
                        <Button rounded onPress={() => {
                        }} style={button}>
                            <Text style={buttonText}>{'Invite Members'.toUpperCase()}</Text>
                        </Button>
                    </Content>
                }
            </Page>
        )
    }
}