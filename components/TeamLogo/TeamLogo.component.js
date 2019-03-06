import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../constants/Colors';
import {getTeamInitials} from './TeamLogo.helpers';
import styled from 'styled-components/native'

const TeamLogoBorder = styled.View`
  background-color: transparent;
  height: ${props => props.size || 78};
  width: ${props => props.size || 78};
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255,255,255,.61);
`

const TeamLogo = styled.View`
  background-color: ${colors.dark};
  height: 90%;
  width: 90%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const TeamLogoText = styled.Text`
  color: ${colors.air};
  font-size: ${props => props.size / 2.5 || 28};
`

const TeamLogoComponent = ({name, size}) => (
    <TeamLogoBorder size={size}>
        <TeamLogo>
            <TeamLogoText size={size}>
                {getTeamInitials(name)}
            </TeamLogoText>
        </TeamLogo>
    </TeamLogoBorder>
)

TeamLogo.propTypes = {
    name: PropTypes.string
}

export default TeamLogoComponent