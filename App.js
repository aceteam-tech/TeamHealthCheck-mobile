import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import {Loader} from './components'

export default class App extends React.Component {
    assetsToLoad = [
        // Backgrounds
        require('./components/Page/background.png'),
        // Tab navigation icons
        require('./navigation/icon-team-active.png'),
        require('./navigation/icon-team-inactive.png'),
        require('./navigation/icon-health-check-active.png'),
        require('./navigation/icon-health-check-inactive.png'),
        require('./navigation/icon-diagram-active.png'),
        require('./navigation/icon-diagram-inactive.png')
    ]


    render() {
        return (
            <Loader assetsToLoad={this.assetsToLoad}>
                <AppNavigator />
            </Loader>
        )
    }
}
