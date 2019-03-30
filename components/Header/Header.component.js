import React from 'react'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import ifNotch from '../../helpers/ifNotch'

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const HeaderTitle = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 3;
  align-self: center;
`

const HeaderCenter = styled.View`
  justify-content: center;
  align-items: center;
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
    <Header style={{ marginTop: ifNotch ? 15 : 0 }}>
        <HeaderLeft>
            {left}
        </HeaderLeft>
        {
            typeof title === 'string' ?
                <HeaderTitle>
                    {title}
                </HeaderTitle> :
                <HeaderCenter>
                    {title}
                </HeaderCenter>
        }
        <HeaderRight>
            {right}
        </HeaderRight>
    </Header>
)
