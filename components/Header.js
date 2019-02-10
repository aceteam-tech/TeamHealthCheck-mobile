import React from 'react'
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import ifNotch from '../helpers/ifNotch'

const Header = styled.View`
  flex-direction: row;
  justifyContent: space-between;
  align-items: center;
`

const HeaderTitle = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 3;
`

const HeaderLeft = styled.View`
  flex: 1;
  margin-left: 20px;
`
const HeaderRight = styled.View`
  flex: 1;
  margin-right: 20px;
  align-items: flex-end;
`

export default ({ title, left, right }) => (
    <Header style={{marginTop: ifNotch ? 15 : 0}}>
        <HeaderLeft>
            {left}
        </HeaderLeft>
        <HeaderTitle>
            {title}
        </HeaderTitle>
        <HeaderRight>
            {right}
        </HeaderRight>
    </Header>
)
