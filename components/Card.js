import React from 'react'
import {CardItem, Card} from 'native-base'
import {TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import styled from 'styled-components/native'
import TeamLogo from './TeamLogo/TeamLogo.component'

const CardIcon = styled.Image`
    width: 60px; 
    height: 60px;
`

const CardText = styled.Text`
  flex: 1;
  color: ${colors.primary};
  text-align: center;
  font-size: 18px;
`

const IconWrapper = styled.View`
    width: 60px;
`

const squadCardStyles = {
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    marginBottom: 15
}

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
}

export default ({item, onPress}) => (
    <Card style={squadCardStyles}>
        <TouchableOpacity
            onPress={() => onPress(item)}>
            <CardItem style={cardItemStyles}>
                <IconWrapper>
                    {
                        !!item.image ?
                            <CardIcon source={{uri: item.image}}/> :
                            <TeamLogo name={item.name} size={60} />
                    }
                </IconWrapper>
                <CardText>{item.name}</CardText>
            </CardItem>
        </TouchableOpacity>
    </Card>
)