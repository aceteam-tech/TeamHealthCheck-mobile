import React from 'react'
import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'
import { AppLoading, Asset, Font } from 'expo'

const Container = styled.View`
    flex: 1;
`

export default class Loader extends React.Component {
    state = {
        isLoadingComplete: false
    }

    _loadResourcesAsync = async () => {
        if(!this.props.assetsToLoad) return true

        return Promise.all([
            Asset.loadAsync([
                ...this.props.assetsToLoad
            ]),
            Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
            }),
        ])
    }

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error)
    }

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true })
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            )
        }
        return (
            <Container>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                {
                    this.props.children
                }
            </Container>
        )
    }
}
