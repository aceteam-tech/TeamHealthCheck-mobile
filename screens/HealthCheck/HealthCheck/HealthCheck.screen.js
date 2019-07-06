import React from 'react';
import { View } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../../constants/Colors'
import {Button, Header, Loading, UsersCompactList, PageWithMenu} from '../../../components/index'
import teamStore from '../../../model/team-store'
import userStore from '../../../model/user-store'
import votingStore from '../../../model/voting-store'
import voteStore from '../../../model/vote-store'
import {
    getHealthCheckStatus, createHealthCheck, endHealthCheck, getHealthChecks
} from '../../../services/connection/adapters/http-api'
import { observer } from 'mobx-react/native'

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

const BurgerButton = styled.TouchableOpacity`
  padding: 10px 20px;
`

const onCreateHealthCheck = async (teamId) => {
    const healthCheck = await createHealthCheck(teamId)
    votingStore.setHealthCheck(healthCheck)
}

const onEndHealthCheck = async (teamId, navigate) => {
    const healthCheck = await endHealthCheck(teamId)
    const healthChecks = await getHealthChecks(teamId)
    votingStore.setHealthCheck(healthCheck)
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

const HealthCheckComponent = observer(({ teamStore, userStore, navigate }) => {
    const { ended, usersSubmitted } = votingStore.healthCheck
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
        const { email } = userStore.user
        votingEnabled = usersNotVoted.map(s => s.email).includes(email)
    }
    return (
        <PageWithMenu navigate={navigate}>
            {({ onToggleMenu }) => (
                <PageContent>
                    <Header title='Health Check' right={
                        <BurgerButton onPress={onToggleMenu}>
                            <MaterialIcons color='white' size={27} name='menu'/>
                        </BurgerButton>
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
        votingStore.setHealthCheck(healthCheck)
    }

    render() {
        return <HealthCheckComponent
            teamStore={teamStore}
            userStore={userStore}
            navigate={this.props.navigation.navigate}
        />
    }
}