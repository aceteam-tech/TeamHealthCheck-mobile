import React from 'react'
import { Content } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import teamStore from '../../../model/team-store'
import { observer } from 'mobx-react/native'
import { removeFromTeam } from '../../../services/connection/adapters/http-api'
import { Header, PageWithMenu, TeamLogo, Button, UserListItem } from '../../../components/index'
import { AddButtonWrapper, BurgerButton, DynamicContent, HeaderWrapper } from './Team.styles'

const RightHeader = ({ onToggleMenu }) => (
    <BurgerButton onPress={onToggleMenu}>
        <MaterialIcons color='white' size={27} name='menu'/>
    </BurgerButton>
)

const TeamComponent = observer(({ navigate, onToggleMenu }) => (
    <DynamicContent>
        <HeaderWrapper>
            <Header alignItems='flex-start'
                    title={<TeamLogo name={teamStore.team.name}/>}
                    right={<RightHeader onToggleMenu={onToggleMenu}/>}
            />
        </HeaderWrapper>
        <Content>
            {
                teamStore.team.users.map(u => (
                    <UserListItem key={u.id} user={u}
                                  removeUser={() => removeFromTeam(teamStore.team.id, u.id)}/>
                ))
            }
        </Content>
        <AddButtonWrapper>
            <Button onPress={() => {
                navigate('Invite')
            }} version='add'/>
        </AddButtonWrapper>
    </DynamicContent>
))

export default ({ navigation }) => {
    const { navigate } = navigation
    return (
        <PageWithMenu navigate={navigate}>
            {
                ({ onToggleMenu }) =>
                    <TeamComponent onToggleMenu={onToggleMenu}
                                   navigate={navigate}/>
            }
        </PageWithMenu>
    )
}
