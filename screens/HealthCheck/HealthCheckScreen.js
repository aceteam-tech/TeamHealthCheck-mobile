import React from 'react';
import {Text} from 'native-base'
import {View} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Button from '../../components/Button'
import teamStore from '../../model/team-store'
import userStore from '../../model/user-store'
import healthCheckStore from '../../model/health-check-store'
import {getHealthCheckStatus, createHealthCheck, endHealthCheck} from '../../adapters/api';
import Card from '../../components/Card'
import {observer} from 'mobx-react/native';

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
                <View>
                    {
                        !!usersNotVoted.length &&
                        <View>
                            <Text>
                                Users who haven't voted:
                            </Text>
                            {
                                usersNotVoted.map(u => (
                                    <Card key={u.id} onPress={f => f} item={u}/>
                                ))
                            }
                        </View>
                    }
                    {
                        !!usersVoted.length &&
                        <View>
                            <Text>
                                Users who have voted:
                            </Text>
                            {
                                usersSubmitted.map(u => (
                                    <Card key={u.id} onPress={f => f} item={u}/>
                                ))
                            }
                        </View>
                    }
                </View>
            }
            {
                !!ended &&
                <Text>
                    There is no active health check at the moment
                </Text>
            }
            <Footer>
                {
                    votingEnabled &&
                    <Button onPress={()=>navigate('CategoryVote')} text='Vote' version='primary'/>
                }
                {
                    !!ended ?
                        <Button onPress={()=>onCreateHealthCheck(teamId)} text='Start Health Check' version='secondary'/> :
                        <Button onPress={()=>onEndHealthCheck(teamId)} text='End Health Check' version='secondary'/>
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