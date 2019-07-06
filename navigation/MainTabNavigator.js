/* eslint global-require: 0 */
import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { HealthCheck, CategoryVote, VotingSummary as Summary } from '../screens/health-check'
import { Team, TeamSettings, TeamDashboard } from '../screens/teams'

// Left tab
const HealthCheckStack = createStackNavigator({
    HealthCheck,
    CategoryVote,
    Summary
}, { headerMode: 'none' })

HealthCheckStack.navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Health Check',
    tabBarVisible: navigation.state.index === 0,
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-health-check-active.png')}/>
            : <Image source={require('./icon-health-check-inactive.png')}/>
    )
})

// Center tab
const DashboardStack = createStackNavigator({
    TeamDashboard,
    TeamSettings
}, { headerMode: 'none' })

DashboardStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-diagram-active.png')}/>
            : <Image source={require('./icon-diagram-inactive.png')}/>
    )
}

// Right tab
Team.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-team-active.png')}/>
            : <Image source={require('./icon-team-inactive.png')}/>
    )
}

export default createBottomTabNavigator({
    HealthCheckStack,
    DashboardStack,
    Team
}, {
    tabBarOptions: {
        style: {
            height: 70
        },
        tabStyle: {
            paddingBottom: 10,
            paddingTop: 10
        }
    }
})
