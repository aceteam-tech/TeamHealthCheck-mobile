import React from 'react';
import {Content} from 'native-base'
import styled from 'styled-components/native'
import teamStore from '../../model/team-store'
import {observer} from 'mobx-react/native'
import TeamLogo from '../../components/TeamLogo/TeamLogo.component'
import Page from '../../components/Page'
import Button from '../../components/Button/Button.component'
import UserListItem from '../../components/UserListItem'
import Header from '../../components/Header'

const DynamicContent = styled.View`
  flex: 1;
`

const TeamLogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`

const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

const TeamComponent = observer(({store, navigate}) => (
    <Page>
        {
            !!store.team &&
            <DynamicContent>
                <Header title={store.team.name} />

                <Content>
                    <TeamLogoWrapper>
                        <TeamLogo name={store.team.name}/>
                    </TeamLogoWrapper>
                    {
                        store.team.users.map(u => (
                            <UserListItem key={u.id} user={u}/>
                        ))
                    }
                </Content>
                <AddButtonWrapper>
                    <Button onPress={() => { navigate('Invite')
                    }} version='add'/>
                </AddButtonWrapper>
            </DynamicContent>
        }
    </Page>
))

export default class TeamScreen extends React.Component {
    render () {
        return <TeamComponent
            store={teamStore}
            navigate={this.props.navigation.navigate}
        />
    }
}
