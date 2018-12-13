import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import {myTeams} from '../adapters/api';

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.air};
    justifyContent: space-between;
`

const TeamIcon = styled.Image`
    width: 50; 
    height: 50;
    marginRight: 20;
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

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
}

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        teams: []
    }

    async componentDidMount () {
        const teams = await myTeams()
        if(teams){
            this.setState({teams})
        }
    }

    render () {
        return (
            <Page>
                <Content>
                    <Header>
                        <HeaderText>Teams</HeaderText>
                    </Header>
                    <TeamsList>
                        {
                            this.state.teams.map(team => (
                                <Card key={team.id} style={squadCardStyles}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Team', {
                                            id: team.id,
                                            title: team.name
                                        })}>
                                        <CardItem style={cardItemStyles}>
                                            {
                                                !!team.image &&
                                                <TeamIcon
                                                    source={{uri: team.image}}/>
                                            }
                                            <Text style={{flex: 1}}>{team.name}</Text>
                                            <Icon name='ios-arrow-forward'
                                                  type='Ionicons'
                                                  style={{color: '#0CAADC', fontSize: 30}}/>
                                        </CardItem>

                                    </TouchableOpacity>
                                </Card>
                            ))
                        }
                    </TeamsList>
                </Content>
                <Button full style={{backgroundColor: '#0CAADC'}}
                        onPress={() => this.props.navigation.navigate('AddTeam')}>
                    <Text>Create new team</Text>
                </Button>
            </Page>
        )
    }
}