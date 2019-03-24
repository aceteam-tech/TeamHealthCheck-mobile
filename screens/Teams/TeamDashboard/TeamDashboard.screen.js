import React from 'react';
import { Content } from 'native-base'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import teamStore from '../../../model/team-store'
import {Header, PageWithMenu, CategoryListItem} from '../../../components/index'
import colors from '../../../constants/Colors'

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`
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

const TeamDashboardComponent = observer(({ store, navigate }) => (
    <PageWithMenu navigate={navigate}>
        {({ onToggleMenu }) => (
            <PageContent>
                <HeaderWrapper>
                    <Header title='Dashboard' right={
                        <TouchableOpacity onPress={onToggleMenu}>
                            <MaterialIcons color='white' size={27} name='menu'/>
                        </TouchableOpacity>
                    }/>
                </HeaderWrapper>
                {
                    !!store.lastResults ?
                        <Content>
                            {
                                store.lastResults.map(c => (
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
))

@observer
export default class TeamDashboardScreen extends React.Component {
    render() {
        return <TeamDashboardComponent
            store={teamStore}
            navigate={this.props.navigation.navigate}
        />
    }
}