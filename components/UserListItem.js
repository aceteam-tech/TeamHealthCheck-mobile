import React from 'react';
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import Avatar from './Avatar/Avatar.component'
import PropTypes from 'prop-types';

const ListItem = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255,255,255,.49);
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
  margin-left: 20px;
`

const ListIcon = styled.View`
  margin-right: 10px;
`

const ListText = styled.Text`
  color: ${colors.air};
  font-size: 16px;
`

const UserListItem = ({user}) => (
    <ListItem>
        <ListIcon>
            <Avatar name={user.name} size={42}/>
        </ListIcon>
        <ListText>{user.name}</ListText>
    </ListItem>
)

UserListItem.propTypes = {
    name: PropTypes.string
}

export default UserListItem