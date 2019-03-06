import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../constants/Colors'
import {getInitials} from './Avatar.helpers'
import styled from 'styled-components/native'

const Avatar = styled.View`
  background-color: ${colors.dark};
  height: ${props => props.size || 50};
  width: ${props => props.size || 50};
  border-radius: ${props => props.size / 2 || 25};
  justify-content: center;
  align-items: center;
`

const AvatarText = styled.Text`
  color: ${colors.air};
  font-size: ${props => props.size / 2.5 || 20};
`

const AvatarComponent = ({name, size}) => (
    <Avatar size={size}>
        <AvatarText size={size}>
            {getInitials(name)}
        </AvatarText>
    </Avatar>
)

AvatarComponent.propTypes = {
    name: PropTypes.string
}

export default AvatarComponent