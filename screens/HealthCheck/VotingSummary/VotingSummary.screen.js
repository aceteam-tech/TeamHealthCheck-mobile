import React from 'react'
import {observer} from 'mobx-react/native'
import styled from 'styled-components/native'

import {Button, Header, Loading, Page, ArrowBack} from '../../../components/index'

import healthCheckStore from '../../../model/health-check-store'
import teamStore from '../../../model/team-store'
import {sendStatus, getHealthCheckStatus} from '../../../adapters/api'

const HeaderWrapper = styled.View`
  margin-bottom: 50px;
`
const VotingSummaryComponent = observer(({navigation, healthCheckStore, teamStore}) => {
    if(!healthCheckStore.healthCheck.categories) return <Loading />

    const send = async () => {
        const healthCheckId = healthCheckStore.healthCheck.id
        const {categoriesToSend} = healthCheckStore
        await sendStatus(healthCheckId, categoriesToSend)
        const newStatus = await getHealthCheckStatus(teamStore.team.id)
        healthCheckStore.setHealthCheck(newStatus)
        navigation.navigate('HealthCheck')
    }

    return (
        <Page>
            <HeaderWrapper>
                <Header title='Summary' left={<ArrowBack onPress={() => navigation.goBack(null)}/>}/>
            </HeaderWrapper>
            <Button onPress={send} text='Send!' version='secondary'/>
        </Page>
    )
})

export default class VotingSummaryScreen extends React.Component {
    render () {
        return <VotingSummaryComponent
            healthCheckStore={healthCheckStore}
            teamStore={teamStore}
            navigation={this.props.navigation}
        />
    }
}