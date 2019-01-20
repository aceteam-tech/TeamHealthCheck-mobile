import React from 'react';
import chunk from 'lodash/chunk'
import {View} from 'react-native'
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import Avatar from './Avatar/Avatar.component'
import PropTypes from 'prop-types';

const UsersList = styled.View`
  
`

const User = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
`

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
  margin-left: 20px;
  flex-wrap: wrap;
`

const ListIcon = styled.View`
  margin-right: 8px;
`

const ListText = styled.Text`
  color: ${colors.air};
  font-size: 14px;
`

const UsersCompactList = ({users}) => {
    const chunked = chunk(users, 3)
    return (
        <UsersList>
            {
                chunked.map((arr, i) => (
                    <ListItem key={i}>
                        {
                            arr.map(u => (
                                <User key={u.id}>
                                    <ListIcon>
                                        <Avatar name={u.name} size={29}/>
                                    </ListIcon>
                                    <ListText>{u.name}</ListText>
                                </User>
                            ))
                        }
                    </ListItem>
                ))
            }
        </UsersList>
    )
}

UsersCompactList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
    )
}

export default UsersCompactList