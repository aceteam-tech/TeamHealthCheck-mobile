import React from 'react'
import { Content } from 'native-base'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamStore from '../../../model/team-store'
import { Header, PageWithMenu, CategoryListItem } from '../../../components/index'
import colors from '../../../constants/Colors'
import { getHealthChecks } from '../../../adapters/api'

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

const TeamDashboardComponent = ({ lastResults, navigate }) => (
    <PageWithMenu navigate={navigate}>
        {({ onToggleMenu }) => (
            <PageContent>
                <HeaderWrapper>
                    <Header title='Dashboard' right={
                        <BurgerButton onPress={onToggleMenu}>
                            <MaterialIcons color='white' size={27} name='menu'/>
                        </BurgerButton>
                    }/>
                </HeaderWrapper>
                {
                    !!lastResults ?
                        <Content>
                            {
                                lastResults.map(c => (
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
        )}
    </PageWithMenu>
)

@observer
export default class TeamDashboardScreen extends React.Component {
    componentDidMount() {
        this.updateHealthChecksSubscription = this.props.navigation.addListener('didFocus', this.updateHealthChecks)
    }

    componentWillUnmount() {
        this.updateHealthChecksSubscription.remove()
    }

    async updateHealthChecks() {
        const healthChecks = await getHealthChecks(teamStore.team.id)
        teamStore.setHealthChecks(healthChecks)
    }

    render() {
        return <TeamDashboardComponent
            lastResults={teamStore.lastResults}
            navigate={this.props.navigation.navigate}
        />
    }
}