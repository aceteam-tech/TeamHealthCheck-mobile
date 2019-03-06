import React from 'react'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const Body = styled.View`
  flex: 1;
  justify-content: center;
`

const NoHealthCheckText = styled.Text`
  text-align: center;
  color: ${colors.air};
  font-size: 20px;
  margin-left: 50px;
  margin-right: 50px;
`

export default () => (
    <Body>
        <NoHealthCheckText>
        Loading...
        </NoHealthCheckText>
    </Body>
)
