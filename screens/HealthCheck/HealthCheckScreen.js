import React from 'react';
import {Text} from 'native-base'
import {View} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Button from '../../components/Button'
import teamStore from '../../model/team-store'
import healthCheckStore from '../../model/health-check-store'
import {getHealthCheckStatus} from '../../adapters/api';
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

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
}

const HealthCheckComponent = observer(({healthCheckStore}) => {
    const {ended, usersSubmitted} = healthCheckStore.healthCheck
    return (
        <Page>
            <Header>
                <HeaderText>Health Check</HeaderText>
            </Header>
            {
                !ended && usersSubmitted ?
                    <View>
                        <View>
                            <Text>
                                Users who haven't voted:
                            </Text>
                            {
                                usersSubmitted.map(u => (
                                    <Card key={u.id} onPress={f => f} item={u}/>
                                ))
                            }
                        </View>
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
                    </View> :
                    <Text>
                        There is no active health check at the moment
                    </Text>
            }


            <Footer>
                {
                    !!ended ?
                        <Button onPress={f => f} text='Start Health Check' version='secondary'/> :
                        <Button onPress={f => f} text='End Health Check' version='secondary'/>
                }

            </Footer>
        </Page>
    )
})

export default class HealthCheckScreen extends React.Component {
    async componentDidMount () {
        const healthCheck = await getHealthCheckStatus(teamStore.team.id)
        console.log({'healthCheck': healthCheck});
        healthCheckStore.setHealthCheck(healthCheck)
    }

    render () {
        return <HealthCheckComponent
            healthCheckStore={healthCheckStore}
            teamStore={teamStore}
        />
    }
}