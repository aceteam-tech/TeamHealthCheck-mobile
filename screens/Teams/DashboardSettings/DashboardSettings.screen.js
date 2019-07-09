import React from 'react'
import { Content } from 'native-base'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamVotingsStore from '../TeamDashboard/team-votings.store'
import { Header, Page, CategoryListItem, ArrowBack } from '../../../components/index'
import colors from '../../../constants/Colors'

const HeaderWrapper = styled.View``

const PageContent = styled.View`
  flex: 1;
`

const NoHealthCheckText = styled.Text`
  text-align: center;
  color: ${colors.air};
  font-size: 20px;
  margin-left: 50px;
  margin-right: 50px;
`

export default observer(({ navigation }) => (
    <Page version={2}>
        <PageContent>
            <HeaderWrapper>
                <Header title='Dashboard settings'
                        left={<ArrowBack onPress={() => navigation.goBack(null)}/>}/>
            </HeaderWrapper>
            <NoHealthCheckText>
                Current sprint: {teamVotingsStore.currentSprintIndex + 1}
            </NoHealthCheckText>
            <NoHealthCheckText>
                Compared sprint: {teamVotingsStore.comparedSprintIndex + 1}
            </NoHealthCheckText>
        </PageContent>
    </Page>
))