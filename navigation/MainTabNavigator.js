import React from 'react';
import {Platform, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HealthCheckScreen from '../screens/HealthCheck/HealthCheckScreen';
import CategoryVoteScreen from '../screens/HealthCheck/CategoryVoteScreen';
import TeamScreen from '../screens/Teams/TeamScreen';
import TeamSettingsScreen from '../screens/Teams/TeamSettingsScreen';
import TeamDashboardScreen from '../screens/Teams/TeamDashboardScreen';

const DashboardStack = createStackNavigator({
    TeamDashboard: TeamDashboardScreen,
    TeamSettings: TeamSettingsScreen,
}, {
    headerMode: 'none'
});

DashboardStack.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <Image source={require('../assets/images/icon-diagram.png')}/>
    ),
};

const TeamStack = createStackNavigator({
    Team: TeamScreen
}, {
    headerMode: 'none'
});

TeamStack.navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({focused}) => (
        <Image source={require('../assets/images/icon-team.png')}/>
    ),
};

const HealthCheckStack = createStackNavigator({
    HealthCheck: HealthCheckScreen,
    CategoryVote: CategoryVoteScreen,
}, {
    headerMode: 'none'
});

HealthCheckStack.navigationOptions = {
    tabBarLabel: 'HealthCheck',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HealthCheckStack,
    DashboardStack,
    TeamStack,
}, {
    tabBarOptions: {
        showLabel: false
    }
});
