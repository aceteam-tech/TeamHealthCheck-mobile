/* eslint global-require: 0 */
import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import { HealthCheck, CategoryVote, VotingSummary as Summary } from '../screens/health-check'
import { Team, TeamSettings, TeamDashboard, DashboardSettings } from '../screens/teams'
import styled from 'styled-components/native'

const MenuImage = styled.Image`
  height: 25px;
  resizeMode: contain;
`


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
            ? <MenuImage source={require('./icon-health-check-active.png')}/>
            : <MenuImage source={require('./icon-health-check-inactive.png')}/>
    )
})

// Center tab
const DashboardStack = createStackNavigator({
    TeamDashboard,
    DashboardSettings,
    TeamSettings
}, { headerMode: 'none' })

DashboardStack.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ focused }) => (
        focused
            ? <MenuImage source={require('./icon-dashboard-active.png')}/>
            : <MenuImage source={require('./icon-dashboard-inactive.png')}/>
    )
}

// Right tab
Team.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ focused }) => (
        focused
            ? <MenuImage source={require('./icon-team-active.png')}/>
            : <MenuImage source={require('./icon-team-inactive.png')}/>
    )
}

export default createBottomTabNavigator({
    DashboardStack,
    HealthCheckStack,
    Team
}, {
    tabBarOptions: {
        activeTintColor: '#4ba3ff',
        style: {
            height: 65
        },
        tabStyle: {
            paddingBottom: 10,
            paddingTop: 10
        }
    }
})
