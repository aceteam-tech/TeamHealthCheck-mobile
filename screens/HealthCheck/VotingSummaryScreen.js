import React from 'react';
import {Icon} from 'native-base'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Header from '../../components/Header'
import healthCheckStore from '../../model/health-check-store'
import Loading from '../../components/Loading'
import {observer} from 'mobx-react/native';
import Button from '../../components/Button/Button.component'
import {sendStatus} from '../../adapters/api';

const HeaderWrapper = styled.View`
  margin-bottom: 50px;
`
const VotingSummaryComponent = observer(({navigation, healthCheckStore}) => {
    if(!healthCheckStore.healthCheck.categories) return <Loading />

    const send = async () => {
        const healthCheckId = healthCheckStore.healthCheck.id
        const {categoriesToSend} = healthCheckStore
        const status = await sendStatus(healthCheckId, categoriesToSend)
        console.log({'status': status})
        navigation.navigate('TeamDashboard')
    }

    return (
        <Page>
            <HeaderWrapper>
                <Header title='Summary' left={
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                        <Icon name='ios-arrow-back'
                              type='Ionicons'
                              style={{color: colors.air, fontSize: 30}}/>
                    </TouchableOpacity>
                }/>
            </HeaderWrapper>
            <Button onPress={send} text='Send!' version='secondary'/>
        </Page>
    )
})

export default class CategoryVoteScreen extends React.Component {
    render () {
        return <VotingSummaryComponent
            healthCheckStore={healthCheckStore}
            navigation={this.props.navigation}
        />
    }
}