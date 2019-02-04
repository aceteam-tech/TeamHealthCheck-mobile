import { createSwitchNavigator } from 'react-navigation'

import TeamsNavigator from './TeamsNavigator'
import AuthNavigator from './AuthNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

export default createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    AuthFlow: AuthNavigator,
    TeamsFlow: TeamsNavigator,
})
