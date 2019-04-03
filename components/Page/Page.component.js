import React from 'react'
import styled from 'styled-components/native'
import BackgroundV1 from './background.png'
import BackgroundV2 from './background-v2.png'
import appStore from '../../model/app.store'
import Loading from '../Loading/Loading.component'
import { observer } from 'mobx-react/native'
import Error from '../Error/Error.component'

const PageCompoponent = styled.ImageBackground`
    flex: 1;
    padding-top: 20px;
`

@observer
class Page extends React.Component {
    render() {
        const {children, version} = this.props
        if(appStore.error){
            return <Error />
        }
        return (
            <PageCompoponent source={version === 2 ? BackgroundV2 : BackgroundV1}>
                {
                    appStore.loading ? <Loading/> : children
                }
            </PageCompoponent>
        )
    }
}

Page.defaultProps = {
    version: 1
}

export default Page