import styled from 'styled-components/native'
import colors from '../../constants/Colors'

export const HeaderWrapper = styled.View``

export const PageContent = styled.View`
  flex: 1;
`

export const SprintSelect = styled.TouchableOpacity`
  background-color: ${colors.air};
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
`

export const OptionsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const TileOptionWrapper = styled.View`
  width: 25%;
  padding-top: 10px;
  padding-left: ${({index}) => index % 4 === 0 ? 10 : 5}px;
  padding-right: ${({index}) => index % 4 === 3 ? 10 : 5}px;
`

export const TileOption = styled.TouchableOpacity`
  background-color: ${({selected}) => selected ? colors.errorBackground : colors.air};
  border-radius: 10px;
  padding: 20px 0;
`

export const NoHealthCheckText = styled.Text`
  text-align: center;
  color: ${({selected}) => selected ? colors.air : colors.primary};
  font-size: 20px;
`

