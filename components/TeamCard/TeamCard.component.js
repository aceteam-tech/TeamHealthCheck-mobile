import React from 'react'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import TeamLogo from '../TeamLogo/TeamLogo.component'

const CardIcon = styled.View`
    margin: 20px;
`

const CardText = styled.Text`
  color: ${colors.air};
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`

const TeamMembers = styled.Text`
  color: ${colors.air};
  font-size: 14px;
  font-weight: 100;
`

const TeamInfo = styled.View`
  flex-direction: column;
`

const TeamCard = styled.TouchableOpacity`
  border-color: ${colors.separator};
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`

export default ({ item, onPress }) => (
    <TeamCard
        onPress={() => onPress(item)}
    >
        <CardIcon>
            <TeamLogo name={item.name} size={60} />
        </CardIcon>
        <TeamInfo>
            <CardText>{item.name}</CardText>
            <TeamMembers>
Members:
                {item.users.length}
            </TeamMembers>
        </TeamInfo>
    </TeamCard>
)
