import React from 'react'
import { Content } from 'native-base'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamStore from '../../../model/team-store'
import { Header, PageWithMenu, CategoryListItem } from '../../../components/index'
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

const TeamDashboardComponent = observer(({ onToggleMenu }) => (
    <PageContent>
        <HeaderWrapper>
            <Header title={
                teamStore.healthChecks.length ?
                    'Sprint #' + teamStore.healthChecks.length :
                    'Team Dashboard'
            }
                    right={
                        <BurgerButton onPress={onToggleMenu}>
                            <MaterialIcons color='white' size={27} name='menu'/>
                        </BurgerButton>
                    }/>
        </HeaderWrapper>
        {
            !!teamStore.lastResults ?
                <Content>
                    {
                        teamStore.lastResults.map(c => (
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
        const healthChecks = await getHealthChecks(teamStore.team.id)
        teamStore.setHealthChecks(healthChecks)
    }

    render() {
        return (
            <PageWithMenu version={2} navigate={this.props.navigation.navigate}>
                {({ onToggleMenu }) => (
                    <TeamDashboardComponent
                        onToggleMenu={onToggleMenu}
                    />
                )}
            </PageWithMenu>
        )
    }
}