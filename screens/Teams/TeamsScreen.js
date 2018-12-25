import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Button from '../../components/Button'
import {getMyTeams} from '../../adapters/api';
import teamsStore from '../../model/team-store'

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

const TeamsScreenComponent = ({teams, chooseTeam, navigate}) => (
    <Page>
        <Content>
            <Header>
                <HeaderText>Teams</HeaderText>
            </Header>
            <TeamsList>
                {
                    teams.map(team => (
                        <Card key={team.id} style={squadCardStyles}>
                            <TouchableOpacity
                                onPress={() => chooseTeam(team)}>
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
        <View>
            <Button onPress={() => navigate('AddTeam')}
                    text='Add new team'
                    version='primary'
            />
            <Button onPress={() => navigate('AddTeam')}
                    text='Join team'
                    version='secondary'
            />
        </View>
    </Page>
)

export default class TeamsScreen extends React.Component {
    state = {
        teams: []
    }

    async componentDidMount () {
        const teams = await getMyTeams()
        if(teams){
            this.setState({teams})
        }
    }

    chooseTeam = (team) => {
        teamsStore.setTeam(team)
        this.props.navigation.navigate('TeamDashboard')
    }

    render () {
        return <TeamsScreenComponent
            teams={this.state.teams}
            chooseTeam={this.chooseTeam}
            navigate={this.props.navigation.navigate}
        />
    }
}