import React from 'react'
import styled from 'styled-components/native'
import BgBlueGradient from './background.png'
import appStore from '../../model/app.store'
import Loading from '../Loading/Loading.component'
import { observer } from 'mobx-react/native'

const PageCompoponent = styled.ImageBackground`
    flex: 1;
    padding-top: 20px;
`

@observer
export default class Page extends React.Component {
    render() {
        const {children} = this.props
        return (
            <PageCompoponent source={BgBlueGradient}>
                {
                    appStore.loading ? <Loading/> : children
                }
            </PageCompoponent>
        )
    }
}