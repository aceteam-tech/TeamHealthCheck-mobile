import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/Mocked/SettingsScreen';
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
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
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
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
}, {
    headerMode: 'none'
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    DashboardStack,
    TeamStack,
    SettingsStack,
});
