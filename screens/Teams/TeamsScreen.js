import React from 'react';
import {Image, View, Text} from 'react-native'
import {Content} from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'
import Button from '../../components/Button/Button.component'
import {getMyTeams, getHealthChecks} from '../../adapters/api'
import teamsStore from '../../model/team-store'
import Page from '../../components/Page'
import TeamCard from '../../components/TeamCard'
import Header from '../../components/Header'
import styled from 'styled-components/native'
import IconLink from '../../assets/images-x-large/icon-link-3x.png'
import IconPlus from '../../assets/images-x-large/icon-plus-3x.png'
import ifNotch from '../../helpers/ifNotch'

const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

const HeaderWrapper = styled.View`
  margin-bottom: 30px;
`

const MenuWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  display: ${props => props.open ? 'flex' : 'none'}
`

const Menu = styled.View`
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
    state={
        isOpen: false
    }

    render(){
        const {teams, chooseTeam, navigate} = this.props
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Teams' right={
                        <MaterialIcons color='white' size={27} name='menu'/>
                    } />
                </HeaderWrapper>
                <Content>
                    {
                        teams.map(team => (
                            <TeamCard key={team.id} onPress={chooseTeam} item={team}/>
                        ))
                    }
                </Content>
                <AddButtonWrapper>
                    <Button onPress={() => this.setState({isOpen: true})} version='add'/>
                </AddButtonWrapper>
                <MenuWrapper open={this.state.isOpen} onPress={() => this.setState({isOpen: false})}>
                    <Menu>
                        <MenuItem onPress={() => {navigate('JoinTeam'); this.setState({isOpen:false})}}>
                            <Image source={IconLink}
                                   resizeMode='contain'
                                   style={{height: 40, alignSelf: 'center', margin: 10}}/>
                                   <Text>Join Team</Text>
                        </MenuItem>

                        <MenuItem onPress={() => {navigate('AddTeam'); this.setState({isOpen:false})}}>
                            <Image source={IconPlus}
                                   resizeMode='contain'
                                   style={{height: 40, alignSelf: 'center', margin: 10}}/>
                            <Text>Add Team</Text>
                        </MenuItem>
                    </Menu>
                </MenuWrapper>

            </Page>
        )
    }
}

export default class TeamsScreen extends React.Component {
    state = {
        teams: []
    }

    async componentDidMount () {
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

    render () {
        return <TeamsScreenComponent
            teams={this.state.teams}
            chooseTeam={this.chooseTeam}
            navigate={this.props.navigation.navigate}
        />
    }
}
