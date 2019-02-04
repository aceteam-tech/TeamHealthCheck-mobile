import React from 'react';
import {Content} from 'native-base'
import styled from 'styled-components/native'
import {observer} from 'mobx-react/native'
import teamStore from '../../model/team-store'
import Page from '../../components/Page'
import Header from '../../components/Header'
import CategoryListItem from '../../components/CategoryListItem'
import colors from '../../constants/Colors';

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
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

const TeamDashboardComponent = observer(({store}) => (
    <Page>
        <HeaderWrapper>
            <Header title='Dashboard'/>
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
    </Page>
))

export default class TeamDashboardScreen extends React.Component {
    render () {
        return <TeamDashboardComponent
            store={teamStore}
        />
    }
}