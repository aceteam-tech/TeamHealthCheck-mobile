/* eslint global-require: 0 */
import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { HealthCheck, CategoryVote, VotingSummary as Summary } from '../screens/health-check'
import { Team, TeamSettings, TeamDashboard, Invite } from '../screens/teams'

const DashboardStack = createStackNavigator({
    TeamDashboard,
    TeamSettings
}, {
    headerMode: 'none'
})

DashboardStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-diagram-active.png')}/>
            : <Image source={require('./icon-diagram-inactive.png')}/>
    )
}

const TeamStack = createStackNavigator({
    Team,
    Invite
}, {
    headerMode: 'none'
})

TeamStack.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-team-active.png')}/>
            : <Image source={require('./icon-team-inactive.png')}/>
    )
}

const HealthCheckStack = createStackNavigator({
    HealthCheck,
    CategoryVote,
    Summary
}, {
    headerMode: 'none'
})

HealthCheckStack.navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Health Check',
    tabBarVisible: navigation.state.index === 0,
    tabBarIcon: ({ focused }) => (
        focused
            ? <Image source={require('./icon-health-check-active.png')}/>
            : <Image source={require('./icon-health-check-inactive.png')}/>
    )
})

export default createBottomTabNavigator({
    HealthCheckStack,
    DashboardStack,
    TeamStack
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
