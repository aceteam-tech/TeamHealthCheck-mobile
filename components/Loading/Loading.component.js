import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const Body = styled.View`
  flex: 1;
  justify-content: center;
`

export default () => (
    <Body>
        <ActivityIndicator size="large" color={colors.air} />
    </Body>
)
