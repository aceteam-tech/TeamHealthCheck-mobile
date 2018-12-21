import React from 'react';
import {createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
});