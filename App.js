import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Loader } from './components'

export default class App extends React.Component {
    assetsToLoad = [
        // Backgrounds
        require('./components/Page/background.png'),
        require('./components/Page/background-v2.png'),
        require('./components/Error/bg-error.png'),
        // Tab navigation icons
        require('./navigation/icon-team-active.png'),
        require('./navigation/icon-team-inactive.png'),
        require('./navigation/icon-health-check-active.png'),
        require('./navigation/icon-health-check-inactive.png'),
        require('./navigation/icon-dashboard-active.png'),
        require('./navigation/icon-dashboard-inactive.png'),
        // Error icon
        require('./components/Error/error-icon.png')
    ]

    render() {
        return (
            <Loader assetsToLoad={this.assetsToLoad}>
                <AppNavigator/>
            </Loader>
        )
    }
}
