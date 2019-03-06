import React from 'react'
import styled from 'styled-components/native'
import BgBlueGradient from './bg-blue-gradient-2x.png'

const Page = styled.ImageBackground`
    flex: 1;
    padding-top: 40px;
`

export default ({ children }) => (
    <Page source={BgBlueGradient}>
        {children}
    </Page>
)
