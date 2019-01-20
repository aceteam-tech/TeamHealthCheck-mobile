import React from 'react';
import {Text} from 'native-base'
import {View} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Button from '../../components/Button/Button.component'
import teamStore from '../../model/team-store'
import userStore from '../../model/user-store'
import healthCheckStore from '../../model/health-check-store'
import {getHealthCheckStatus, createHealthCheck, endHealthCheck} from '../../adapters/api';
import UsersCompactList from '../../components/UsersCompactList'
import {observer} from 'mobx-react/native';

const Header = styled.View`
    justifyContent: space-around;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    justify-content: center;
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

const onEndHealthCheck = async (teamId) => {
    const healthCheck = await endHealthCheck(teamId)
    healthCheckStore.setHealthCheck(healthCheck)
}

const HealthCheckComponent = observer(({healthCheckStore, teamStore, userStore, navigate}) => {
    const {ended, usersSubmitted} = healthCheckStore.healthCheck
    const {users, id: teamId} = teamStore.team
    let usersNotVoted = []
    let usersVoted = usersSubmitted || []
    let votingEnabled = false
    if (!ended) {
        if (usersVoted.length) {
            usersNotVoted = users.filter(u => !usersSubmitted.map(s => s.id).includes(u.id))
        } else {
            usersNotVoted = users
        }
        const {sub} = userStore.user
        votingEnabled = usersNotVoted.map(s => s.id).includes(sub)
    }
    return (
        <Page>
            <Header>
                <HeaderText>Health Check</HeaderText>
            </Header>
            {
                !ended &&
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
            }
            {
                !!ended &&
                <Body>
                    <NoHealthCheckText>
                        There is no active Health Check at the moment...
                    </NoHealthCheckText>
                </Body>
            }
            <Footer>
                {
                    votingEnabled &&
                    <Button onPress={() => navigate('CategoryVote')} text='Vote' version='primary'/>
                }
                {
                    !!ended ?
                        <Button onPress={() => onCreateHealthCheck(teamId)} text='Create Health Check'
                                version='secondary'/> :
                        <Button onPress={() => onEndHealthCheck(teamId)} text='End Health Check' version='secondary'/>
                }
            </Footer>
        </Page>
    )
})

export default class HealthCheckScreen extends React.Component {
    async componentDidMount () {
        const healthCheck = await getHealthCheckStatus(teamStore.team.id)
        healthCheckStore.setHealthCheck(healthCheck)
    }

    render () {
        return <HealthCheckComponent
            healthCheckStore={healthCheckStore}
            teamStore={teamStore}
            userStore={userStore}
            navigate={this.props.navigation.navigate}
        />
    }
}