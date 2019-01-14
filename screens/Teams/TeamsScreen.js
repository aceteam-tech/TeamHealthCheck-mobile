import React from 'react';
import {View} from 'react-native';
import {Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Button from '../../components/Button'
import {getMyTeams} from '../../adapters/api'
import teamsStore from '../../model/team-store'
import Page from '../../components/Page'
import {signOut} from '../../adapters/auth'
import Card from '../../components/Card'

const Header = styled.View`
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const TeamsScreenComponent = ({teams, chooseTeam, navigate}) => (
    <Page>
        <Header>
            <HeaderText>Teams</HeaderText>
        </Header>
        <Content>
            {
                teams.map(team => (
                    <Card key={team.id} onPress={chooseTeam} item={team} />
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