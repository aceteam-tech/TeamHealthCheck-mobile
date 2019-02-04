/* eslint global-require: 0 */
import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import HealthCheckScreen from '../screens/HealthCheck/HealthCheckScreen'
import CategoryVoteScreen from '../screens/HealthCheck/CategoryVoteScreen'
import VotingSummaryScreen from '../screens/HealthCheck/VotingSummaryScreen'
import TeamScreen from '../screens/Teams/TeamScreen'
import TeamSettingsScreen from '../screens/Teams/TeamSettingsScreen'
import TeamDashboardScreen from '../screens/Teams/TeamDashboardScreen'
import InviteScreen from '../screens/Teams/InviteScreen'

const DashboardStack = createStackNavigator({
    TeamDashboard: TeamDashboardScreen,
    TeamSettings: TeamSettingsScreen,
}, {
    headerMode: 'none'
})

DashboardStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('../assets/images/icon-diagram-active.png')} />
            : <Image source={require('../assets/images/icon-diagram-inactive.png')} />
    ),
}

const TeamStack = createStackNavigator({
    Team: TeamScreen,
    Invite: InviteScreen
}, {
    headerMode: 'none'
})

TeamStack.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('../assets/images/icon-team-active.png')} />
            : <Image source={require('../assets/images/icon-team-inactive.png')} />
    ),
}

const HealthCheckStack = createStackNavigator({
    HealthCheck: HealthCheckScreen,
    CategoryVote: CategoryVoteScreen,
    Summary: VotingSummaryScreen,
}, {
    headerMode: 'none'
})

HealthCheckStack.navigationOptions = {
    tabBarLabel: 'HealthCheck',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('../assets/images/icon-health-check-active.png')} />
            : <Image source={require('../assets/images/icon-health-check-inactive.png')} />
    ),
}

export default createBottomTabNavigator({
    HealthCheckStack,
    DashboardStack,
    TeamStack,
}, {
    tabBarOptions: {
        showLabel: false
    }
})
