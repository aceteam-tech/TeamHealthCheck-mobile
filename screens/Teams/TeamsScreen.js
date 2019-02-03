import React from 'react';
import {View} from 'react-native';
import {Content} from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'
import Button from '../../components/Button/Button.component'
import {getMyTeams} from '../../adapters/api'
import teamsStore from '../../model/team-store'
import Page from '../../components/Page'
import {signOut} from '../../adapters/auth'
import TeamCard from '../../components/TeamCard'
import Header from '../../components/Header'
import styled from 'styled-components/native'

const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

const TeamsScreenComponent = ({teams, chooseTeam, navigate}) => (
    <Page>
        <HeaderWrapper>
            <Header title='Teams' right={
                <MaterialIcons color='white' size={27} name='menu'/>
            } />
        </HeaderWrapper>
        <Content>
            {
                teams.map(team => (
                    <TeamCard key={team.id} onPress={chooseTeam} item={team}/>
                ))
            }
            <View>
                {/*<Button onPress={() => navigate('AddTeam')}*/}
                        {/*text='Add new team'*/}
                        {/*version='primary'*/}
                {/*/>*/}
                {/*<Button onPress={() => navigate('AddTeam')}*/}
                        {/*text='Join team'*/}
                        {/*version='secondary'*/}
                {/*/>*/}

            </View>
        </Content>
        <AddButtonWrapper>
            <Button onPress={() => navigate('AddTeam')} version='add'/>
        </AddButtonWrapper>
        <Button onPress={() => navigate('JoinTeam')} text='Join Team' version='primary'/>
        <Button onPress={() => {signOut(); navigate('Welcome')}} text='Temporary Logout' version='secondary'/>
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