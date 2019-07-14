import React from 'react'
import { Content } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamVotingsStore from '../TeamDashboard/team-votings.store'
import { Header, Page, ArrowBack } from '../../../components/index'
import { HeaderWrapper, PageContent } from './DashboardSettings.styles'
import TilesSelect from '../../../components/TilesSelect/TilesSelect.component'

const renderTitle = ({changingCurrent, changingCompared}) => {
    if(changingCurrent){
        return 'Set current sprint'
    }
    if(changingCompared){
        return 'Set compared sprint'
    }
    return 'Dashboard settings'
}

export default observer(({ navigation }) => (
    <Page version={2}>
        <PageContent>
            <HeaderWrapper>
                <Header title={renderTitle(teamVotingsStore.votings)}
                        left={<ArrowBack onPress={() => navigation.goBack(null)}/>}/>
            </HeaderWrapper>
            <Content>
                {
                    teamVotingsStore.votings.items.length > 1 &&
                    <TilesSelect
                        listOpen={teamVotingsStore.votings.changingCurrent}
                        openListFn={teamVotingsStore.changeCurrentSprint}
                        selectFn={teamVotingsStore.selectCurrentSprint}
                        options={
                            new Array(teamVotingsStore.votings.items.length)
                                .fill('')
                                .map((el, i) => teamVotingsStore.votings.items.length - i)
                        }
                        selected={teamVotingsStore.votings.current}
                        label={'Current sprint: ' + (teamVotingsStore.votings.current)}
                    />
                }
                {
                    teamVotingsStore.votings.items.length > 2 &&
                    teamVotingsStore.votings.current > 1 &&
                    <TilesSelect
                        listOpen={teamVotingsStore.votings.changingCompared}
                        openListFn={teamVotingsStore.changeComparedSprint}
                        selectFn={teamVotingsStore.selectComparedSprint}
                        options={
                            new Array(teamVotingsStore.votings.current - 1)
                                .fill('')
                                .map((el, i) => teamVotingsStore.votings.current - i - 1)
                        }
                        selected={teamVotingsStore.votings.compared }
                        label={'Compared sprint: ' + (teamVotingsStore.votings.compared)}
                    />
                }
            </Content>
        </PageContent>
    </Page>
))