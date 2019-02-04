import React from 'react'
import { Platform, StatusBar } from 'react-native'
import {
    AppLoading, Asset, Font, Icon
} from 'expo'
import styled from 'styled-components/native'
import AppNavigator from './navigation/AppNavigator'

const Container = styled.View`
    flex: 1;
    background-color: #fff
`

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

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
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
            </Container>
        )
    }

    _loadResourcesAsync = async () => Promise.all([
        Asset.loadAsync([
            require('./assets/images-large/bg-blue-gradient-2x.png'),
            require('./assets/images/welcome-bg.jpg'),
            require('./assets/images-large/icon-user-2x.png'),
            require('./assets/images-large/icon-id-2x.png')
        ]),
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        }),
    ]);

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error)
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true })
    };
}
