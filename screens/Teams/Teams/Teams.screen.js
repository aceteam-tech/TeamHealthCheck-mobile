import React from 'react'
import { Image, Animated } from 'react-native'
import { Content } from 'native-base'
import { observer } from 'mobx-react/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import teamStore from '../../../model/team-store'
import teamsStore from '../../../model/teams-store'
import { Header, Button, Page, TeamCard, Loader } from '../../../components/index'
import authStore from '../../../services/connection/adapters/auth'
// import {register} from '../../../helpers/push.helper'

import { Menu, MenuItem, AddButtonWrapper, LogoutButton, MenuShadow, MenuText, NoneTeamsText, NoneTeamsWrapper } from './Teams.styles'

const addTeamIcon = require('./add-team-2x.png')
const joinTeamIcon = require('./join-team-2x.png')

@observer
export default class TeamsScreen extends React.Component {
    state = {
        isOpen: false,
        bounceValue: new Animated.Value(200)
    }

    toggleMenu() {
        let toValue = 200

        if (!this.state.isOpen) {
            toValue = 0
        }

        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue
            }
        ).start()

        this.setState({ isOpen: !this.state.isOpen })
    }

    chooseTeam = async (team) => {
        teamStore.setTeam(team)
        const nextScreen = team.users.length > 1 ? 'TeamDashboard' : 'Team'
        this.props.navigation.navigate(nextScreen)
    }

    render() {
        const { navigate } = this.props.navigation
        const { teams } = teamsStore
        return (
            <Loader assetsToLoad={[addTeamIcon, joinTeamIcon]}>
                <Page version={2} >
                    <Header title='TEAMS' right={
                        <LogoutButton onPress={() => {
                            authStore.signOut()
                            navigate('Welcome')
                        }
                        }>
                            <MaterialCommunityIcons color='white' size={27} name='logout'/>
                        </LogoutButton>
                    }/>
                    {
                        !teams.length ?
                            <NoneTeamsWrapper>
                                <NoneTeamsText>
                                    {`You don't have any teams.\nAdd or join one.`}
                                </NoneTeamsText>
                            </NoneTeamsWrapper>
                            :
                            <Content>
                                {
                                    teams.map(team => (
                                        <TeamCard key={team.id} onPress={this.chooseTeam} item={team}/>
                                    ))
                                }
                            </Content>
                    }
                    {
                        !this.state.isOpen &&
                        <AddButtonWrapper>
                            <Button onPress={() => this.toggleMenu()} version='add'/>
                        </AddButtonWrapper>
                    }
                    {this.state.isOpen
                    && <MenuShadow onPress={() => this.toggleMenu()}/>}

                    <Menu style={{ transform: [{ translateY: this.state.bounceValue }] }}>
                        <MenuItem onPress={() => {
                            navigate('JoinTeam')
                            this.toggleMenu()
                        }}>
                            <Image source={joinTeamIcon}
                                   resizeMode='contain'
                                   style={{ height: 40, alignSelf: 'center', margin: 10 }}/>
                            <MenuText>Join Team</MenuText>
                        </MenuItem>

                        <MenuItem onPress={() => {
                            navigate('AddTeam')
                            this.toggleMenu()
                        }}>
                            <Image source={addTeamIcon}
                                   resizeMode='contain'
                                   style={{ height: 40, alignSelf: 'center', margin: 10 }}/>
                            <MenuText>Add Team</MenuText>
                        </MenuItem>
                    </Menu>

                </Page>

            </Loader>
        )
    }
}
