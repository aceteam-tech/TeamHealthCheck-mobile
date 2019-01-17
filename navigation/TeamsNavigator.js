import React from 'react';
import {createStackNavigator} from 'react-navigation';

import TeamsScreen from '../screens/Teams/TeamsScreen';
import AddTeamScreen from '../screens/Teams/AddTeam/AddTeamScreen';
import MainTabNavigator from './MainTabNavigator';

export default createStackNavigator({
    Teams: TeamsScreen,
    AddTeam: AddTeamScreen,
    Main: MainTabNavigator,
}, {
    headerMode: 'none'
});
