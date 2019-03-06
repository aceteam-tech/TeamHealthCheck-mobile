import React from 'react'
import { Modal } from 'react-native'
import { Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import {TeamLogo, Page} from '../'
import IconProfile from './icon-profile.png'
import IconSettings from './icon-settings.png'
import IconLogout from './icon-logout.png'
import { signOut } from '../../adapters/auth'

const TeamName = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${colors.air};
  font-size: 24px;
`

const ChangeTeam = styled.TouchableOpacity``

const ChangeTeamText = styled.Text`
  color: ${colors.air};
  font-size: 17px;
`

const MenuItem = styled.TouchableOpacity`
  border-color: ${colors.separator};
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`

const MenuItemText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
`

const MenuTeam = styled.View`
  align-items: center;
  margin-bottom: 30px;
  margin-top: 15px;
`

const MenuIcon = styled.Image`
  height: 60px; 
  margin: 0 20px;
  align-self: center;
`

const Header = styled.View`
  flex-direction: row;
  justifyContent: space-between;
`

const HeaderCenter = styled.View`
  flex: 1;
`

const HeaderLeft = styled.View`
  flex: 1;
  margin-left: 20px;
`
const HeaderRight = styled.TouchableOpacity`
  flex: 1;
  margin-right: 20px;
  align-items: flex-end;
`

export default ({ team, visible, navigate, onToggleVisible }) => (
    <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={false}
        visible={visible}
        onRequestClose={f => f}>
        <Page>
            <MenuTeam>
                <Header>
                    <HeaderLeft/>
                    <HeaderCenter>
                        <TeamLogo name={team.name} size={96}/>
                    </HeaderCenter>
                    <HeaderRight onPress={onToggleVisible}>
                        <Icon name='close'
                              type='MaterialIcons'
                              style={{ color: colors.air, fontSize: 30 }}/>
                    </HeaderRight>
                </Header>
                <TeamName>{team.name}</TeamName>
                <ChangeTeam onPress={() => navigate('Teams')}>
                    <ChangeTeamText>
                        Change team
                    </ChangeTeamText>
                </ChangeTeam>
            </MenuTeam>
            <MenuItem>
                <MenuIcon source={IconProfile}
                          resizeMode='contain'/>
                <MenuItemText>Profile</MenuItemText>
            </MenuItem>
            <MenuItem>
                <MenuIcon source={IconSettings}
                          resizeMode='contain'/>
                <MenuItemText>Settings</MenuItemText>
            </MenuItem>
            <MenuItem onPress={() => {
                signOut()
                navigate('Welcome')
            }}>
                <MenuIcon source={IconLogout}
                          resizeMode='contain'/>
                <MenuItemText>Log out</MenuItemText>
            </MenuItem>
        </Page>
    </Modal>
)
