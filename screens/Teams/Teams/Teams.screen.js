import React from 'react'
import {Image, Text, Animated} from 'react-native'
import {Content} from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'
import {getMyTeams, getHealthChecks} from '../../../adapters/api'
import teamsStore from '../../../model/team-store'
import {Header, Button, Page, TeamCard} from '../../../components/index'
import styled from 'styled-components/native'
import IconLink from './icon-link-3x.png'
import IconPlus from './icon-plus-3x.png'
import ifNotch from '../../../helpers/ifNotch'

const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

const MenuShadow = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  display: flex
`

const Menu = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 150px;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-bottom: ${ifNotch ? 20 : 0};
    box-shadow: 0 -2px 3px rgba(0,0,0,0.15);
`

const MenuItem = styled.TouchableOpacity`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

class TeamsScreenComponent extends React.Component {
    state = {
        isOpen: false,
        bounceValue: new Animated.Value(200),
    }

    toggleMenu() {

        let toValue = 200

        if (!this.state.isOpen) {
            toValue = 0
        }

        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue,
            }
        ).start()


        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const {teams, chooseTeam, navigate} = this.props
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Teams' right={
                        <MaterialIcons color='white' size={27} name='menu'/>
                    }/>
                </HeaderWrapper>
                <Content>
                    {
                        teams.map(team => (
                            <TeamCard key={team.id} onPress={chooseTeam} item={team}/>
                        ))
                    }
                </Content>
                <AddButtonWrapper>
                    <Button onPress={() => this.toggleMenu()} version='add'/>
                </AddButtonWrapper>
                
                {this.state.isOpen 
                    && <MenuShadow onPress={() => this.toggleMenu()}/>}

                <Menu style={{transform: [{translateY: this.state.bounceValue}]}}>
                    <MenuItem onPress={() => {
                        navigate('JoinTeam')
                        this.toggleMenu()
                    }}>
                        <Image source={IconLink}
                               resizeMode='contain'
                               style={{height: 40, alignSelf: 'center', margin: 10}}/>
                        <Text>Join Team</Text>
                    </MenuItem>

                    <MenuItem onPress={() => {
                        navigate('AddTeam')
                        this.toggleMenu()
                    }}>
                        <Image source={IconPlus}
                               resizeMode='contain'
                               style={{height: 40, alignSelf: 'center', margin: 10}}/>
                        <Text>Add Team</Text>
                    </MenuItem>
                </Menu>

            </Page>
        )
    }
}

export default class TeamsScreen extends React.Component {
    state = {
        teams: []
    }

    async componentDidMount() {
        const teams = await getMyTeams()
        if (teams) {
            this.setState({teams})
        }
    }

    chooseTeam = async (team) => {
        const healthChecks = await getHealthChecks(team.id)
        teamsStore.setTeam(team)
        teamsStore.setHealthChecks(healthChecks)
        this.props.navigation.navigate('TeamDashboard')
    }

    render() {
        return <TeamsScreenComponent
            teams={this.state.teams}
            chooseTeam={this.chooseTeam}
            navigate={this.props.navigation.navigate}
        />
    }
}
