import { Animated } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../constants/Colors'

export const AddButtonWrapper = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: row;
`

export const MenuShadow = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  display: flex
`

export const Menu = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 150px;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 -2px 3px rgba(0,0,0,0.15);
`

export const MenuItem = styled.TouchableOpacity`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NoneTeamsWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const NoneTeamsText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
`

export const LogoutButton = styled.TouchableOpacity`
  padding: 10px 20px;
`

export const MenuText = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: 100;
`