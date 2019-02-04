import React from 'react'
import styled from 'styled-components/native'

const Body = styled.View`
  flex: 1;
  justify-content: center;
`

export default () => (
    <Body>
        <NoHealthCheckText>
        Loading...
        </NoHealthCheckText>
    </Body>
)
