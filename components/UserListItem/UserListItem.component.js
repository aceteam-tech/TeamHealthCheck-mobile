import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native'
import Swipeout from 'react-native-swipeout'
import colors from '../../constants/Colors'
import Avatar from '../Avatar/Avatar.component'
import Loader from '../Loader/Loader.component'

import deleteIcon from './delete-2x.png'

const ListItemWrapper = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255,255,255,.49);
  margin-left: 20px;
`

const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`

const ListIcon = styled.View`
  margin-right: 10px;
`

const FirstName = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const LastName = styled.Text`
  color: ${colors.air};
  font-size: 16px;
`

const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Name = styled.View`
  flex-direction: column;
`

const splitFullName = (name) => {
    const words = name.split(' ').filter(w => w !== '')
    return {
        first: words[0],
        last: words.slice(1).join(' ')
    }
}

const UserListItem = ({ user, removeUser }) => {
    const buttons = [{
        component: (
            <ImageWrapper>
                <Image source={deleteIcon} resizeMode='contain' style={{ height: 30 }}/>
            </ImageWrapper>
        ),
        backgroundColor: '#214159',
        onPress: removeUser
    }]

    return (
        <Loader assetsToLoad={[deleteIcon]}>
            <ListItemWrapper>
                <Swipeout right={buttons} backgroundColor='transparent'>
                    <ListItem>
                        <ListIcon>
                            <Avatar name={user.name} size={42}/>
                        </ListIcon>
                        <Name>
                            <FirstName>{splitFullName(user.name).first}</FirstName>
                            <LastName>{splitFullName(user.name).last}</LastName>
                        </Name>
                    </ListItem>
                </Swipeout>
            </ListItemWrapper>
        </Loader>
    )
}

export default UserListItem
