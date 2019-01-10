import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Button from '../../components/Button'
import {getMyTeams} from '../../adapters/api'
import teamsStore from '../../model/team-store'
import Page from '../../components/Page'
import {signOut} from '../../adapters/auth'

const TeamIcon = styled.Image`
    width: 60px; 
    height: 60px;
`

const TeamIconWrapper = styled.View`
    width: 60px;
`

const Header = styled.View`
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const squadCardStyles = {
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    height: 100,
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
        <Header>
            <HeaderText>Teams</HeaderText>
        </Header>
        <Content>
            {
                teams.map(team => (
                    <Card key={team.id} style={squadCardStyles}>
                        <TouchableOpacity
                            onPress={() => chooseTeam(team)}>
                            <CardItem style={cardItemStyles}>
                                <TeamIconWrapper>
                                    {
                                        !!team.image &&
                                        <TeamIcon
                                            source={{uri: team.image}}/>
                                    }
                                </TeamIconWrapper>
                                <Text style={{
                                    flex: 1,
                                    color: colors.primary,
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>{team.name}</Text>
                                {/*<Icon name='ios-arrow-forward'*/}
                                {/*type='Ionicons'*/}
                                {/*style={{color: '#0CAADC', fontSize: 30}}/>*/}
                            </CardItem>

                        </TouchableOpacity>
                    </Card>
                ))
            }
            <View>
                <Button onPress={() => navigate('AddTeam')}
                        text='Add new team'
                        version='primary'
                />
                <Button onPress={() => navigate('AddTeam')}
                        text='Join team'
                        version='secondary'
                />
                <Button onPress={() => {
                    signOut()
                    navigate('Welcome')
                }}
                        text='Temporary Logout'
                        version='secondary'
                />
            </View>
        </Content>
    </Page>
)

export default class TeamsScreen extends React.Component {
    state = {
        teams: []
    }

    async componentDidMount () {
        const teams = await getMyTeams()
        if (teams) {
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