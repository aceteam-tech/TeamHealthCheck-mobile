import React from 'react'
import { Modal } from 'react-native'
import { Icon } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import TeamLogo from '../TeamLogo/TeamLogo.component'
import Page from '../Page/Page.component'
import Header from '../Header/Header.component'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import authStore from '../../services/connection/adapters/auth'
import socketStore from '../../services/connection/adapters/socket.store'

const ChangeTeam = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 10px 30px;
`

const ChangeTeamText = styled.Text`
  color: ${colors.air};
  font-size: 17px;
`

const MenuItem = styled.TouchableOpacity`
  border-color: ${colors.separator};
  border-bottom-width: 1px;
  border-top-width: 1px;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
`

const MenuItemText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
`

const MenuTeam = styled.View`
  align-items: center;
  margin-bottom: 30px;
`

const MenuIcon = styled(MaterialCommunityIcons)`
  margin: 0 20px;
  align-self: center;
`

const HeaderRight = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  padding: 10px 20px;
`

const RightHeader = ({ onToggleVisible }) => (
    <HeaderRight onPress={onToggleVisible}>
        <Icon name='close'
              type='MaterialIcons'
              style={{ color: colors.air, fontSize: 30 }}/>
    </HeaderRight>
)

export default ({ team, visible, navigate, onToggleVisible }) => (
    <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={false}
        visible={visible}
        onRequestClose={f => f}>
        <Page>
            <MenuTeam>
                <Header title={<TeamLogo name={team.name} size={96}/>}
                        right={<RightHeader onToggleVisible={onToggleVisible}/>}
                />
                <ChangeTeam onPress={() => navigate('Teams')}>
                    <ChangeTeamText>
                        Change team
                    </ChangeTeamText>
                </ChangeTeam>
            </MenuTeam>
            <MenuItem onPress={() => {
                authStore.signOut()
                socketStore.close()
                navigate('Welcome')
            }}>
                <MenuIcon color='white' size={27} name='logout'/>
                <MenuItemText>Log out</MenuItemText>
            </MenuItem>
        </Page>
    </Modal>
)
