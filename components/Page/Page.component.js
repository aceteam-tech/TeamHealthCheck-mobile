import React from 'react'
import styled from 'styled-components/native'
import { Keyboard, TouchableWithoutFeedback, SafeAreaView, StatusBar } from 'react-native'
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
        const { children, version, dismissKeyboard } = this.props
        if (appStore.error) {
            return <Error/>
        }
        return (
            <PageCompoponent source={version === 2 ? BackgroundV2 : BackgroundV1}>
                <StatusBar barStyle="light-content" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={!dismissKeyboard} style={{ flex: 1 }}>
                    <SafeAreaView style={{flex: 1}}>
                        {
                            appStore.loading ? <Loading/> : children
                        }
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </PageCompoponent>
        )
    }
}

Page.defaultProps = {
    version: 1,
    dismissKeyboard: false,
}

export default Page