import React from 'react'
import { Content } from 'native-base'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import teamStore from '../../../model/team-store'
import { observer } from 'mobx-react/native'
import { Header, PageWithMenu, TeamLogo, Button, UserListItem } from '../../../components/index'

const DynamicContent = styled.View`
  flex: 1;
`

const HeaderWrapper = styled.View`
  margin-bottom: 20px;
`

const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

const RightHeader = ({ onToggleMenu }) => (
    <TouchableOpacity onPress={onToggleMenu}>
        <MaterialIcons color='white' size={27} name='menu'/>
    </TouchableOpacity>
)

const TeamComponent = observer(({ store, navigate }) => (
    <PageWithMenu navigate={navigate}>
        {({ onToggleMenu }) => (
            <DynamicContent>
                <HeaderWrapper>
                    <Header title={<TeamLogo name={store.team.name}/>}
                            right={<RightHeader onToggleMenu={onToggleMenu}/>}
                    />
                </HeaderWrapper>
                <Content>
                    {
                        store.team.users.map(u => (
                            <UserListItem key={u.id} user={u}/>
                        ))
                    }
                </Content>
                <AddButtonWrapper>
                    <Button onPress={() => {
                        navigate('Invite')
                    }} version='add'/>
                </AddButtonWrapper>
            </DynamicContent>
        )}
    </PageWithMenu>
))

export default class TeamScreen extends React.Component {
    render() {
        return <TeamComponent
            store={teamStore}
            navigate={this.props.navigation.navigate}
        />
    }
}
