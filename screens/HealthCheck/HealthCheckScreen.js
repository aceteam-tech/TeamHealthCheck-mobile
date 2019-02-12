import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import Button from '../../components/Button/Button.component'
import teamStore from '../../model/team-store'
import userStore from '../../model/user-store'
import healthCheckStore from '../../model/health-check-store'
import { getHealthCheckStatus, createHealthCheck, endHealthCheck, getHealthChecks } from '../../adapters/api';
import UsersCompactList from '../../components/UsersCompactList'
import { observer } from 'mobx-react/native';
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import PageWithMenu from '../../components/PageWithMenu'

const Footer = styled.View`
    justify-content: center;
`

const PageContent = styled.View`
  flex: 1;
`

const Section = styled.Text`
  color: ${colors.air};
  font-size: 16px;
  margin-left: 20px;
  margin-bottom: 10px;
`

const Body = styled.View`
  flex: 1;
  justify-content: center;
`

const NoHealthCheckText = styled.Text`
  text-align: center;
  color: ${colors.air};
  font-size: 20px;
  margin-left: 50px;
  margin-right: 50px;
`

const onCreateHealthCheck = async (teamId) => {
    const healthCheck = await createHealthCheck(teamId)
    healthCheckStore.setHealthCheck(healthCheck)
}

const onEndHealthCheck = async (teamId, navigate) => {
    const healthCheck = await endHealthCheck(teamId)
    const healthChecks = await getHealthChecks(teamId)
    healthCheckStore.setHealthCheck(healthCheck)
    teamStore.setHealthChecks(healthChecks)
    return navigate('TeamDashboard')
}

const HealthCheckInactive = ({ teamId }) => (
    <Body>
    <Body>
    <NoHealthCheckText>
        There is no active Health Check at the moment...
    </NoHealthCheckText>
    </Body>
    <Footer>
        <Button onPress={() => onCreateHealthCheck(teamId)}
                text='Create Health Check'
                version='secondary'/>
    </Footer>
    </Body>
)

const HealthCheckActive = ({ usersVoted, usersNotVoted, usersSubmitted, votingEnabled, navigate, teamId }) => (
    <Body>
    <Body>
    {
        !!usersVoted.length &&
        <View>
            <Section>
                Voted
            </Section>
            <UsersCompactList users={usersSubmitted}/>
        </View>
    }
    {
        !!usersNotVoted.length &&
        <View>
            <Section>
                Not voted
            </Section>
            <UsersCompactList users={usersNotVoted}/>
        </View>
    }
    </Body>
    <Footer>
        {
            votingEnabled &&
            <Button onPress={() => navigate('CategoryVote')} text='Vote' version='primary'/>
        }
        <Button onPress={() => onEndHealthCheck(teamId, navigate)} text='End Health Check' version='secondary'/>
    </Footer>
    </Body>
)

const HealthCheckComponent = observer(({ healthCheckStore, teamStore, userStore, navigate }) => {
    const { ended, usersSubmitted } = healthCheckStore.healthCheck
    const { users, id: teamId } = teamStore.team
    let usersNotVoted = []
    let usersVoted = usersSubmitted || []
    let votingEnabled = false
    if (!ended) {
        if (usersVoted.length) {
            usersNotVoted = users.filter(u => !usersSubmitted.map(s => s.id).includes(u.id))
        } else {
            usersNotVoted = users
        }
        const { sub } = userStore.user
        votingEnabled = usersNotVoted.map(s => s.id).includes(sub)
    }
    return (
        <PageWithMenu navigate={navigate}>
            {({ onToggleMenu }) => (
                <PageContent>
                    <Header title='Health Check' right={
                        <TouchableOpacity onPress={onToggleMenu}>
                            <MaterialIcons color='white' size={27} name='menu'/>
                        </TouchableOpacity>
                    }/>
                    {
                        typeof ended === 'undefined' && <Loading/>
                    }
                    {
                        ended === false && <HealthCheckActive
                            usersVoted={usersVoted}
                            usersNotVoted={usersNotVoted}
                            usersSubmitted={usersSubmitted}
                            votingEnabled={votingEnabled}
                            navigate={navigate}
                            teamId={teamId}
                        />
                    }
                    {
                        !!ended && <HealthCheckInactive
                            teamId={teamId}/>
                    }
                </PageContent>
            )}
        </PageWithMenu>
    )
})

export default class HealthCheckScreen extends React.Component {
    async componentDidMount() {
        const healthCheck = await getHealthCheckStatus(teamStore.team.id)
        healthCheckStore.setHealthCheck(healthCheck)
    }

    render() {
        return <HealthCheckComponent
            healthCheckStore={healthCheckStore}
            teamStore={teamStore}
            userStore={userStore}
            navigate={this.props.navigation.navigate}
        />
    }
}