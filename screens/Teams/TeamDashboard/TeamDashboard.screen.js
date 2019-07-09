import React from 'react'
import { Content } from 'native-base'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamStore from '../../../model/team-store'
import teamVotingsStore from './team-votings.store'
import { Header, Page, CategoryListItem } from '../../../components/index'
import colors from '../../../constants/Colors'
import { getHealthChecks } from '../../../services/connection/adapters/http-api'

const HeaderWrapper = styled.View``

const PageContent = styled.View`
  flex: 1;
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

const TeamDashboardComponent = observer(({navigation}) => (
    <PageContent>
        <HeaderWrapper>
            <Header title={
                teamVotingsStore.votings.length ?
                    'Sprint #' + teamVotingsStore.votings.length :
                    'Team Dashboard'
            }
                    right={
                        <BurgerButton onPress={() => navigation.navigate('DashboardSettings')}>
                            <MaterialIcons color='white' size={27} name='settings'/>
                        </BurgerButton>
                    }/>
        </HeaderWrapper>
        {
            !!teamVotingsStore.lastResults ?
                <Content>
                    {
                        teamVotingsStore.lastResults.map(c => (
                            <CategoryListItem key={c.id} category={c}/>
                        ))
                    }
                </Content> :
                <Body>
                <NoHealthCheckText>
                    Finish your first Health Check to see the results here
                </NoHealthCheckText>
                </Body>
        }
    </PageContent>
))

export default class TeamDashboardScreen extends React.Component {
    async componentDidMount() {
        const votings = await getHealthChecks(teamStore.team.id)
        teamVotingsStore.setVotings(votings)
    }

    render() {
        return (
            <Page version={2}>
                <TeamDashboardComponent navigation={this.props.navigation} />
            </Page>
        )
    }
}