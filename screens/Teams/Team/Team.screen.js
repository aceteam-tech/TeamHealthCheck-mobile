import React from 'react'
import { Content } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import teamStore from '../../../model/team-store'
import { observer } from 'mobx-react/native'
import styled from 'styled-components/native'
import { removeFromTeam } from '../../../services/connection/adapters/http-api'
import { Header, PageWithMenu, TeamLogo, Button, UserListItem, Separator } from '../../../components/index'
import { AddButtonWrapper, BurgerButton, DynamicContent, HeaderWrapper } from './Team.styles'
import colors from '../../../constants/Colors'
import { labelStyle } from '../../../constants/Style'

const CodeLabel = styled.Text`
    color: ${colors.air};
    text-align: center;
    font-size: 13px;
    margin: 0 0 10px 15px;
`

const Code = styled.Text`
    color: ${colors.air};
    font-size: 36px;
    letter-spacing: 12px;
    font-weight: bold;
    textAlign: center;
`

const CodeWrapper = styled.View`
  margin-bottom: 20px;
`

const RightHeader = ({ onToggleMenu }) => (
    <BurgerButton onPress={onToggleMenu}>
        <MaterialIcons color='white' size={27} name='menu'/>
    </BurgerButton>
)

const removeUser = async (teamId, userId) => {
    const teamUsersCopy = [...teamStore.team.users]
    teamStore.removeUser(userId)
    removeFromTeam(teamId, userId).catch(() => {
        teamStore.rollbackUsers(teamUsersCopy)
    })
}

const TeamComponent = observer(({ navigate, onToggleMenu }) => (
    <DynamicContent>
        <HeaderWrapper>
            <Header alignItems='flex-start'
                    title={teamStore.team.name}
                    right={<RightHeader onToggleMenu={onToggleMenu}/>}
            />
        </HeaderWrapper>
        <CodeWrapper>
            <CodeLabel style={labelStyle}>Share this code with your crew to let them join {teamStore.team.name}</CodeLabel>
            <Code>{teamStore.team.code}</Code>
        </CodeWrapper>
        <CodeWrapper>
            <Separator/>
        </CodeWrapper>
        <CodeWrapper>
            <CodeLabel style={labelStyle}>{teamStore.team.name} members</CodeLabel>
        </CodeWrapper>
        <Content>
            {
                teamStore.team.users.map(u => (
                    <UserListItem key={u.id} user={u}
                                  removeUser={() => removeUser(teamStore.team.id, u.id)}/>
                ))
            }
        </Content>
    </DynamicContent>
))

export default ({ navigation }) => {
    const { navigate } = navigation
    return (
        <PageWithMenu navigate={navigate} version={2} >
            {
                ({ onToggleMenu }) =>
                    <TeamComponent onToggleMenu={onToggleMenu}
                                   navigate={navigate}/>
            }
        </PageWithMenu>
    )
}
