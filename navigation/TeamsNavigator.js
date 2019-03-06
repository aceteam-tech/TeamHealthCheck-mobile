import { createStackNavigator } from 'react-navigation'
import {Teams, AddTeam, JoinTeam} from '../screens/teams'
import MainTabNavigator from './MainTabNavigator'

export default createStackNavigator({
    Teams,
    AddTeam,
    JoinTeam,
    Main: {
        screen:MainTabNavigator,
        navigationOptions: () => ({
            gesturesEnabled: false
        })
    },
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: true
    }
})
